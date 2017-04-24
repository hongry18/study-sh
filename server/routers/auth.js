import express from 'express';
import mongoose from 'mongoose';
import * as models from '~/models'; 
import { auth as codes } from '~/routers/errors';


const router = express.Router();
const User = mongoose.model('user', models.User);
const usernameRegEx = /^[a-zA-Z]{1}[a-zA-Z0-9]+$/;
const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


router.post('/signup', (req, res) => {
    if(!usernameRegEx.test(req.body.username)) {
        return res.status(400).json({
            code: codes.signup.BAD_USERNAME
        });
    }
    if(!emailRegEx.test(req.body.email)) {
        return res.status(400).json({
            code: codes.signup.BAD_EMAIL
        });
    }
    User.findOne({username: req.body.username}, (err, exist) => {
        if(exist) {
            return res.status(403).json({
                code: codes.signup.EXIST_USERNAME
            });
        }
        if(err) {
            res.status(500).json({
                code: codes.signup.SERVER_FAILED
            });
            throw err;
        }
        //create user
        let newUser = new User({
            username: req.body.username,
            email: req.body.email,
            userpw: req.body.userpw
        });
        newUser.userpw = newUser.generateHash(newUser.userpw);
        newUser.save( err => {
            if(err) {
                res.status(500).json({
                    code: codes.signup.SERVER_FAILED,
                });
                throw err;
            }
            return res.json({success: true});
        });
    });
});

router.post('/login', (req, res) => {
    // validate username
    if (! usernameRegEx.test(req.body.username)) {
        res.status(400).json({
            code: codes.login.BAD_USERNAME,
        });
    }
    User.findOne({username: req.body.username}, (err, user) => {
        if (err) {
            res.status(500).json({
                code: codes.login.SERVER_FAILED,
            });
            throw err;
        }
        if (!user) {
            //if username not exist
            return res.status(404).json({
                code: codes.login.NOT_FOUND
            });
        }
        if (!user.validateHash(req.body.userpw)) { 
            //if userpw is not correct
            return res.status(401).json({
                code: codes.login.BAD_USERNAME,
            });
        }
        // update session loginInfo
        req.session.loginInfo = {
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
            code: codes.status.SESSION_EXPIRED,
        });
    }
    res.json({
        info: req.session.loginInfo
    });
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err){
            res.status(500).json({
                code: codes.status.SERVER_FAILED,
            });
            throw err;
        }
    });
    return res.json({
        success: true
    });
});

export default router;
