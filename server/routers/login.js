import express from 'express';

const router = express.Router();

router.get('/:username/:userpw', (req, res) => {
    let sess = req.session;
    let username = req.params.username;
    let userpw = req.params.userpw;
    let result = {}
    if (username == 'kkr' && userpw == 'groogang') {
        result['success'] = 1;
        sess.username = username; 
        res.json(result);
    }else {
        result['success'] = 0;
        res.json(result);
    }
    return;
});

export default router;
