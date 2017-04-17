import express from 'express';
import config from 'config';
import mongoose from 'mongoose';

import * as models from '~/models'; // import models

const router = express.Router();
const Post = mongoose.model('post', models.Post);

// write memo //
router.post('/', (req, res) => {
    console.log('memo post req, sess:',req.session.loginInfo);
    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(404).json({
            error: 'NOT LOGGED IN',
            code: 1
        });
    }
    // check req body... @todo 

    let postBody = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.loginInfo.username,
        date: new Date()
    };

    let newPost = new Post(postBody);
    newPost.save( err => {
        if(err) throw err;
        return res.json({success: true});
    });
});

// modify memo //
router.put('/', (req, res) => {
    // validation
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(404).json({
            error: 'NOT LOGGED IN',
            code: 2
        });
    }

    Post.findById(req.params.id, (err, doc) => {
        if(err) throw err;
        // check existence
        if(!doc) {
            return res.status(404).json({
                error: 'NOT FOUND',
                code: 3
            });
        }
        // check permission
        if(doc.writer !== req.session.loginInfo.username){
            return res.status(404).json({
                error: 'NOT PERMITTED',
                code: 4
            });
        }
        // modify
        doc.title = req.body.title;
        doc.content = req.body.content;
        doc.date = new Date();
        doc.save((err, memo) => {
            if(err) throw err;
            return res.json({
                success: true,
                memo
            });
        });
    });
});

// delete memo //
router.delete('/:id', (req, res) => {
    // validation
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        });
    }

    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(404).json({
            error: 'NOT LOGGED IN',
            code: 2
        });
    }

    Post.findById(req.params.id, (err, doc) => {
        if(err) throw err;
        // check existence
        if(!doc) {
            return res.status(404).json({
                error: 'NOT FOUND',
                code: 3
            });
        }
        // check permission
        if(doc.writer !== req.session.loginInfo.username){
            return res.status(404).json({
                error: 'NOT PERMITTED',
                code: 4
            });
        }
        // remove
        Post.remove({_id: req.params.id}, err => {
            if(err) throw err;
            return res.json({success: true});
        });
    });
});

// get memo list //
router.get('/', (req, res) => {
    Post.find()
        .sort({_id: -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) throw err;
            res.json(posts);
        });
});

export default router;
