import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    let sess = req.session;
    if (sess.userid) {
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

export default router;


