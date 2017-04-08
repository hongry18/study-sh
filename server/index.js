import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import morgan from 'morgan';
import path from 'path';
import bodyParser from 'body-parser';
import config from 'config';

//import router from '~/router';

const app = express();

// middlewares
app.use(bodyParser.json());
// session
app.use(session( config.get('session') ));

// morgan??

// mongoDB
//const db = mongoose.connection;


app.use('/login/:id/:pw', (req, res) => {
    let sess = req.session;
    let id = req.params.id;
    let pw = req.params.pw;
    let result = {}
    if (id == 'kkr' && pw == 'groogang') {
        result['success'] = 1;
        sess.id = id; /// 이부분 에러
        sess.pw = pw;
        res.json(result);
        return;
    }else {
        result['success'] = 0;
        res.json(result);
        return;
    }
});

app.use('/logout', (req, res) => {
    sess = req.session;
    if (sess.id) {
        req.session.destory( err => {
            if (err) {
                console.log(err.stack);
            }else {
                res.redirect('/');
            }
        });
        res.clearCookie('kidkkr-blog');
    }else {
        res.redirect('/');
    }
});

// static page
//app.use('/', express.static(path.join(config.get('env.path', 'public/'))));
app.use('/', (req, res) => {
    let sess = req.session;
    let result;
    if (sess.id) {
        result = `Hello ${sess.id}`;
    } else {
        result = 'Please Login';
    }
    res.send(result);
});


//app.get('*', (req, res) => {
//    res.sendFile( path.join(config.get('env.path', 'public/index.js')) );
//});

// routers
//app.use('/api', router);

// error handling

// start server
app.listen(config.get('env.port'), err => {
    if(err) {
        console.log(err.stack);
    }
    console.log('Express is listening on', config.get('env.port'));
});
