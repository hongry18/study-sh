// express
import express from 'express';
import session from 'express-session';
// mongodb
import mongoose from 'mongoose';
// path
import path from 'path';
// middlewares
import morgan from 'morgan';
import bodyParser from 'body-parser';
// development only
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// my modules
import api from '~/routers';
import config from '~/config';


const app = express();

// WEBPACK DEV SERVER
if(process.env.NODE_ENV == 'development') {
    let devPort = config.env.devPort;
    console.log('Server is running on development mode');
    const webpackDevConfig = require('../webpack.dev.config');
    const compiler = webpack(webpackDevConfig);
    const devServer = new WebpackDevServer(compiler, webpackDevConfig.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}

// SET MIDDLEWARES
app.use(bodyParser.json());
app.use(session(config.session));
app.use(morgan());

// MONGO DB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to Mongod server'); });
mongoose.connect(config.db.mongo);

// EXPRESS ROUTING
app.use('/api', api);
app.use('/', 
    express.static(path.join(config.env.path, 'public')
));
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

// ERROR HANDLING
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('ERROR');
});

// START SERVER
app.listen(config.env.port, err => {
    if(err) {
        console.log(err.stack);
    }
    console.log('Express is listening on', config.env.port);
});
