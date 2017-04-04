# express js + session + mongodb Store

## install dependency
> npm install --save express-session connect-mongo config

## usage config
### Create json files
> mkdir projectPath/config/<br>
touch config/{default.json,production.json}

### config json file
```javascript
{
    "session": {
        "secret": "foo",
        "maxAge": 3600,
        "millisecond": 1000
    },
    "db": {
        "mongo": "mongodb://localhost/blog"
    }
}
```

## usage session store
### mongoose 4.x, connect 3.x
```javascript
import mongoose from 'mongoose';
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);

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
```
