import express from 'express';
import comment from './comment';
import Post from '~/models/posts/post';
import { hasParams, validationTypes, isNumeric } from '~/libs/util';
 
const router = express.Router();
 
router.post('/', (req, res) => {
    var result = {};
    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    if ( !hasParams(req.body, 'title', 'content') || !validationTypes('string', req.body.title, req.body.content) ) {
        result['error'] = 'empty params';
        result['code'] = 2;
        return res.status(400).json(result);
    }

    Post.findOne({title: req.body.title}, (err, exists) => {
        if (err) throw err;

        if (exists) {
            result['error'] = 'post exists';
            result['code'] = 3;
            return res.status(409).json(result);
        }

        let post = new Post({
            title: req.body.title,
            content: req.body.content,
            author: req.session.loginInfo.nickname,
            userId: req.session.loginInfo._id,
            password: req.body.password
        });

        if ( hasParams(req.body, 'password') ) {
            post.password = post.generateHash(post.password);
        }

        post.save( err => {
            if (err) throw err;
            result['success'] = true;
            return res.json(result);
        });
    });

});

router.put('/:id', (req, res) => {
    var result = {};
    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    if ( !hasParams(req.body, 'id') || !validationTypes('number', req.body.id) ) {
        result['error'] = 'empty params';
        result['code'] = 2;
        return res.status(400).json(result);
    }

    Post.find({postId: req.params.id}, (err, post) => {

        if (err) throw err;

        if (!output.n) {
            result['error'] = 'post not exists';
            result['code'] = 3;
            return res.status(404).json(result);
        }

        if (post.userId != req.session.loginInfo._id) {
            result['code'] = 4;
            result['error'] = 'permission denied';
            return res.json(result);
        }

        post.title = req.body.title;
        post.content = req.body.content;
        post.date.modified = new Date();

        post.save( (err, post) => {
            if (err) throw err;
            result['success'] = true;
            result['post'] = post;
            return res.json(result);
        });

    });

});

router.delete('/:id', (req, res) => {
    var result = {};
    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    if ( !hasParams(req.params, 'id') || !validationTypes('number', req.params.id) ) {
        result['error'] = 'empty params';
        result['code'] = 2;
        return res.status(400).json(result);
    }

    Post.find({postId: req.params.id}, (err, post) => {
        if (err) throw err;

        if (!post) {
            result['error'] = 'not found post';
            result['code'] = 2;
            return res.status(400).json(result);
        }

        Post.remove({postId: req.params.id}, err => {
            if (err) throw err;
            result['success'] = true;
            res.json(result);
        });
    });
});

router.get('/:id', (req, res) => {
    var result = {};
    if ( !hasParams(req.params, 'id') || !validationTypes('number', req.params.id) ) {
        result['error'] = 'empty params';
        result['code'] = 1;
        return res.status(400).json(result);
    }

    Post.find({postId: req.params.id}, (err, post) => {
        if (err) throw err;

        if (!post) {
            result['error'] = 'not found post';
            result['code'] = 2;
            return res.status(400).json(result);
        }

        res.json(post);
    });
});

router.get('/', (req, res) => {
    var result = {};
    var _start = 0;
    var _row = 10;

    if ( hasParams(req.body, 'start') && isNumeric(req.body.start) ) {
        _start = req.body.start;
    }
    if ( hasParams(req.body, 'row') && isNumeric(req.body.row) ) {
        _row = req.body.rows;
    }

    Post.find()
        .sort({_id: -1})
        .skip(_start)
        .limit(_row)
        .exec( (err, posts) => {
            if (err) throw err;
            res.json(posts);
        });
});

router.use('/:id/comment', comment);
 
export default router;
