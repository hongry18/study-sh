if (process.argv.length < 3){
    console.log('invalid port');
    console.log('ex) node app <port>');
    process.exit(0);
}

import express from 'express';
import path from 'path';
import config from '@/config';

import morgan from 'morgan'; // HTTP REQUEST LOGGER
import bodyParser from 'body-parser'; // PARSE HTML BODY

import mongoose from 'mongoose';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
import redis from 'redis';
import RedisStore from 'connect-redis';

const redisStore = new RedisStore(session);
const client = redis.createClient();

import api from '~/routes';

const port = process.argv[2];

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
app.set('jwt-secret', config.jwt.secret)

/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
mongoose.connect( config.db.mongo );

/* use session */
/* use session with mongodb store */
app.use(session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: config.session.maxAge * config.session.millisecond
    },
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        ttl: config.session.maxAge
    })
}));

/* use session with redis store */
/*
app.use(session(
    {
        secret: 'foo',
        store: new redisStore({
            host: "127.0.0.1",
            port: 6379,
            client: client,
            prefix : "session:",
            db : 0,
            ttl: config.session.maxAge
        }),
        saveUninitialized: false, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }
));
*/

app.use( '/', express.static( path.join(config.env.path, '/public')) );

/* setup routers & static directory */
app.use( '/api', api );

app.get('*', (req, res) => {
    res.sendFile( path.join(config.env.path, '/public/index.html') );
});

/* handle error */
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log( 'Express is listening on port ', port );
});
