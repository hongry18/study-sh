import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import config from 'config';

import api from '~/routers';

const app = express();

// middlewares
app.use(bodyParser.json());
// session
app.use(session( config.get('session') ));

// morgan??

// mongoDB
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Connected to Mongod server');
});

mongoose.connect(config.get('db.mongo'));

// routers
app.use('/api', api);

// static page
//app.use('/', express.static(path.join(config.get('env.path', 'public/'))));

app.use('/', (req, res) => {
    let sess = req.session;
    let result;
    if (sess.auth) { // if logged in
        result = `Hello ${sess.username}`;
    } else { // not logged in
        result = 'Please Login';
    }
    res.send(result);
});


//app.get('*', (req, res) => {
//    res.sendFile( path.join(config.get('env.path', 'public/index.js')) );
//});


// error handling

// start server
app.listen(config.get('env.port'), err => {
    if(err) {
        console.log(err.stack);
    }
    console.log('Express is listening on', config.get('env.port'));
});
