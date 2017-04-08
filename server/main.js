import express from 'express';
import path from 'path';
import config from 'config';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';

import api from '~/routes';

const MongoStore = require('connect-mongo')(session);

// import api from '~/routes';

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect( config.get('db.mongo') );

/* use session */
app.use(session({
    secret: config.get('session.secret'),
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.get('session.maxAge') * config.get('session.millisecond')
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: config.get('session.maxAge')
    })
}));

app.use( '/', express.static( path.join(config.get('env.path'), '/public')) );

/* setup routers & static directory */
app.use( '/api', api );

app.get('*', (req, res) => {
    res.sendFile( path.join(config.get('env.path'), '/public/index.html') );
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(config.get('env.port'), () => {
    console.log( 'Express is listening on port ', config.get('env.port') );
});