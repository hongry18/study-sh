import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import * as models from '~/models'; // import models

const router = express.Router();
const User = mongoose.model('user', models.User);
const usernameRegEx = /^[a-zA-Z0-9]+$/;

router.post('/signup', (req, res) => {
    if(!usernameRegEx.test(req.body.username)) {
        return res.status(401).json({
            error: 'BAD USERNAME',
            code: 1
        });
    }
    User.findOne({username: req.body.username}, (err, exist) => {
        if(exist) {
            return res.status(401).json({
                error: 'ACCOUNT EXIST',
                code: 2
            });
        }
        if(err) throw err;
        //create user
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            userpw: req.body.userpw
        });
        newUser.userpw = newUser.generateHash(newUser.userpw);
        newUser.save( err => {
            if(err) throw err;
            return res.json({success: true});
        });
    });
});

router.post('/login', (req, res) => {
    // validate username
    if (! usernameRegEx.test(req.body.username)) {
        return res.status(401).json({
            error: 'BAD USERNAME',
            code: 1
        });
    }
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) throw err;
        if (!user) {
            //if username not exist
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 2
            });
        }
        if (!user.validateHash(req.body.userpw)) { 
            //if userpw is not correct
            return res.status(401).json({
                error: 'LOGIN FAILED',
                code: 2
            });
        }
        //update session loginInfo
        let sess = req.session;
        sess.loginInfo = {
            _id: user._id,
            username: user.username
        };

        req.session.save();
        return res.json({
            success: true
        });
    });
});

router.get('/status', (req, res) => {
    if(typeof req.session.loginInfo === 'undefined') {
        return res.status(401).json({
            error: 1
        });
    }
    res.json({info: req.session.loginInfo});
});

router.get('/logout', (req, res) => {
    req.session.destroy(err => {if(err) throw err;});
    return res.json({success: true});
});

router.get('/:username', (req, res) => {
    //retrieve user
    User.findOne({username: req.params.username}, {email: 1}, (err, user) => {
        if (err) {
            console.log(err.stack);
            return;
        }
        res.send(user['email']); //error
    });
});

export default router;
