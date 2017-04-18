# JWT ( json web token )

## install dependency
```shell
npm install --save express body-parser jsonwebtoken mongoose morgan bcryptjs
```

## create user.js in model
~/server/models/user.js
```javascript
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema({
    name        : String
    ,password   : String
    ,role       : { type: String, default: 'subscription' }
});

User.statics.create = (name, password, role) => {
    const user = new this({
        name, password, role
    });

    return user.save();
}

User.statics.findOneByName = name => {
    return this.findOne({name}).exec();
}

// generates hash
User.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, 8);
};

// compares the password
User.methods.validateHash = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('users', User);
````

## create expressServer
~/server/app.js
```javascript
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const mongoUrl = 'mongo://localhost/jwt';
const port = 3000;

const app = express();

// express set
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.set('jwt-secret', 'jwt-foo');

// index page, just for testing
app.use('/', (req, res) => {
    res.send('Hello JWT')
});

// set api
app.use('/api', require('./routes'));

// open the server
app.listen(port, () => {
    console.log(`Express is running on port ${port}`)
});

// mongo Set
mongoose.connect(config.mongodbUri);
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', ()=>{
    console.log('connected to mongodb server')
});
```

## create routes
~/server/routes/index.js
```javascript
const router = require('express').Router();
const register = require('./register');
const auth = require(./auth);

router.use('/auth', auth);
router.use('/register', register);

module.exports = router;
```

## create register
~/server/routes/register.js
```javascript
const User = require('../models/user');
const router = require('express').Router();
const {name, password, role} = req.body;

router.post('/', (req, res) => {
    const create = user => {
        if (user) {
            thorw new Error('exists name');
        }

        return User.create(name, User.generateHash(password), role);
    }

    const respond = user => {
        res.json({
            name: user.name
            ,role: user.role
            ,message: 'success'
        });
    }

    const onError = err => {
        res.json(
            message: err.message
        );
    }

    user.findOnByName(name)
        .then(create)
        .then(respond)
        .catch(onError);
});

module.exports = router;
```

## create auth
~/server/routes/auth.js
```javascript
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = require('express').Router();

router.get('/login', (req, res) => {
    const {name, password} = req.body;
    const secret = req.app.get('jwt-secret');

    const check = user => {
        if (!user) {
            throw new Error('login failed');
        }

        if (!user.validateHash(password)) {
            throw new Error('login failed');
        }

        return new Promise((resolve, reject) => {
            jwt.sign(
                {
                    _id: user._id
                    ,name: user.name
                    ,role: user.name
                }
                ,secret
                ,{
                    expireIn: '1h'
                    ,issuer: 'localhost'
                    ,subject: 'userInfo'
                }
                ,(err, token) => {
                    if(err) reject(err);
                    resolve(token)
                }
            );
        });
    }

    const respond = token => {
        res.json({
            message: 'success',
            token: token
        });
    }

    const onErr => err => {
        res.json({
            message: err.message
        });
    }

    User.fineOnByName(name)
        .then(check)
        .then(respond)
        .catch(onErr);
});

router.get('/check', (req, res) => {
    const token = req.headers['access-token'];
    const secret = req.app.get('jwt-secret');

    if (!token) {
        return res.json({
            success: false,
            message: 'not logged in'
        });
    }

    const respond = token => {
        res.json({
            success: true,
            token: token
        });
    }

    const onError = err => {
        res.json({
            success: false,
            message: err.message
        });
    }

    new Promise( (resolve, reject) => {
        jwt.verify(token, secret, (err, decode) => {
            if (err) reject(err);
            resolve(decode);
        })
    })
        .then(respond)
        .catch(onError);
});

module.exports = router;
```
