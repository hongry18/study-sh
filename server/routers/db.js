import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import model from '~/model'; // import models

const router = express.Router();
const User = mongoose.model('user', model.Post);
const Post = mongoose.model('post', model.User);

//// Handling Posts
router.get('/posts/:post_id', (req, res) => {
    //retrieve post
    // req.params.post_id
    Post.findOne({post_id: req.params.post_id}, (err, post) => {
        res.send(post);
    });
});

router.post('/posts', (req, res) => {
    //create post from json body
    let post = new Post(req.body);
    post.save( err => {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });
});

//// Handling User
router.get('/users/:username', (req, res) => {
    //retrieve user
    User.findOne({username: req.params.post_id}, (err, post) => {
        res.send(post);
    });
});

router.post('/users', (req, res) => {
    //create user
    let user = new User(req.body);
    user.save( err => {
        if (err) {
            console.error(err);
            res.json({result: 0});
            return;
        }
        res.json({result: 1});
    });   
});

export default router;
