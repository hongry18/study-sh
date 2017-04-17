module.exports = {
<<<<<<< HEAD
    "env": {
        "port": 80,
        "path": "/home/study02/sh"
    },
    "db": {
        "mongo": "mongodb://localhost/blog"
    },
    "session": {
        "secret": "s#eAc!Cr$e##t",
        "maxAge": 3600,
        "millisecond": 1000
    },
    "jwt": {
        "secret": "J!@W#!T^(S$ie^ec@cr#ne&at!q"
=======
    db: {
        mongo: 'mongodb://localhost/blog'
    }
    ,session: {
        maxAge: 3600 * 1000
        ,secret: 'session-foo'
    }
    ,env: {
        path: '/home/study02/study-sh'
        ,port: 3000
    }
    ,jwt: {
        secret: 'jwt-foo'
>>>>>>> origin/hongry
    }
}
