module.exports = {
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
    }
}
