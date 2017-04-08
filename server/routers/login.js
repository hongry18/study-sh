import express from 'express';

const router = express.Router();

router.get('/:username/:userpw', (req, res) => {
    console.log(req.baseUrl);
    let sess = req.session;
    let username_ = req.params.username;
    let userpw_ = req.params.userpw;
    let result = {}
    if (username_ == 'kkr' && userpw_ == 'groogang') {
        result['success'] = 1;
        sess.username = username_; 
        sess.auth = true;
        res.send('login succeed');
    }else {
        result['success'] = 0;
        res.send('login failed');
    }
    console.log(result);
});

export default router;
