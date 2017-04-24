import express from 'express';
import mongoose from 'mongoose';
import * as models from '~/models'; // import models
import { memo as codes} from '~/routers/errors';


const router = express.Router();
const Post = mongoose.model('post', models.Post);

// WRITE
router.post('/', (req, res) => {
    console.log('memo post req, sess:',req.session.loginInfo);
    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(401).json({
            error: 'NOT LOGGED IN',
            code: codes.post.NOT_LOGGEDIN,
        });
    }
    let postBody = {
        title: req.body.title,
        content: req.body.content,
        author: req.session.loginInfo.username,
        date: new Date()
    };
    let newPost = new Post(postBody);
    newPost.save( err => {
        if(err) {
            res.status(500).json({
                error: 'SERVER FAILED',
                code: codes.post.SERVER_FAILED,
            });
            throw err;
        }
        return res.json({success: true});
    });
});

// MODIFY
router.put('/:id', (req, res) => {
    // validation
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: 'BAD ID',
            code: codes.put.BAD_ID,
        });
    }
    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(402).json({
            error: 'SESSION EXPIRED',
            code: codes.put.NOT_LOGGEDIN,
        });
    }
    let objId = new mongoose.Types.ObjectId(req.params.id);
    Post.findById(objId, (err, doc) => {
        if(err) {
            res.status(500).json({
                error: 'SERVER FAILED',
                code: codes.put.SERVER_FAILED,
            });
            throw err;
        }
        // check existence
        if(!doc) {
            return res.status(404).json({
                error: 'NOT FOUND',
                code: codes.put.NOT_FOUND,
            });
        }
        // check permission
        if(doc.author !== req.session.loginInfo.username){
            return res.status(404).json({
                error: 'BAD PERMISSION',
                code: codes.put.BAD_PERMISSION,
            });
        }
        doc.title = req.body.title;
        doc.content = req.body.content;
        // doc.date = new Date(); // fix dates
        doc.save((err, memo) => {
            if(err) {
                res.status(500).json({
                    error: 'SERVER FAILED',
                    code: codes.put.SERVER_FAILED,
                });
                throw err;
            }
            return res.send(memo);
        });
    });
});

// DELETE POST BY ID
router.delete('/:id', (req, res) => {
    let objId = new mongoose.Types.ObjectId(req.params.id);
    // validation
    if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "BAD ID",
            code: codes.delete.BAD_ID,
        });
    }
    // check session
    if(typeof req.session.loginInfo === 'undefined'){
        return res.status(401).json({
            error: 'NOT LOGGED IN',
            code: codes.delete.NOT_LOGGEDIN,
        });
    }
    Post.findById(objId, (err, doc) => {
        if(err) {
            res.status(500).json({
                error: 'SERVER FAILED',
                code: codes.delete.SERVER_FAILED,
            });
            throw err;
        }
        // check existence
        if(!doc) {
            return res.status(404).json({
                error: 'NOT FOUND',
                code: codes.delete.NOT_FOUND,
            });
        }
        // check permission
        if(doc.author !== req.session.loginInfo.username){
            return res.status(404).json({
                error: 'BAD PERMISSION',
                code: codes.delete.BAD_PERMISSION,
            });
        }
        // remove
        Post.remove({_id: objId}, err => {
            if(err) {
                res.status(500).json({
                    error: 'SERVER FAILED',
                    code: codes.delete.SERVER_FAILED,
                });
                throw err;
            }
            return res.json({
                success: true,
            });
        });
    });
});

// GET POST LIST
router.get('/', (req, res) => {
    Post.find()
        .sort({_id: -1})
        .limit(6)
        .exec((err, posts) => {
            if(err) {
                res.status(400).json({
                    error: 'SERVER FAILED',
                    code: codes.get.SERVER_FAILED,
                });
                throw err;
            }
            res.json(posts);
        });
});

router.get('/:listStyle/:id', (req, res) => {
    let listStyle = req.params.listStyle;
    let reqId = req.params.id;

    if (listStyle != 'old' && listStyle != 'new'){
        return res.status(400).json({
            error: 'INVALID LIST STYLE',
            code: codes.get.BAD_REQUEST,
        });
    }
    if (!mongoose.Types.ObjectId.isValid(reqId)){
        return res.status(400).json({
            error: 'BAD ID',
            code: codes.get.BAD_ID,
        });
    }
    let currentObjId = new mongoose.Types.ObjectId(reqId);
    if (listStyle == 'old'){
        // Older posts
        Post.find({ _id: {$lt: currentObjId} })
            .sort({_id: -1})
            .limit(6)
            .exec((err, posts) => {
                if(err) {
                    res.status(500).json({
                        error: 'SERVER FAILED',
                        codes: codes.get.SERVER_FAILED,
                    });
                    throw err;
                }
                return res.json(posts);       
            });
    }else {
        // Newer posts
        Post.find({ _id: {$gt: currentObjId} })
            .sort({_id: -1})
            .limit(6)
            .exec((err, posts) => {
                if(err) {
                    res.status(500).json({
                        error: 'SERVER FAILED',
                        codes: codes.get.SERVER_FAILED,
                    });
                    throw err;
                }
                return res.json(posts);       
            });
    }
});

export default router;
