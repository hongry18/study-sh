import express from 'express';
import Account from '~/models/users/account';
import { hasParams } from '~/libs/util';

const router = express.Router();
 
router.post('/signup', (req, res) => {
    var result = {};

    let nameFilter = /^[0-9a-z]+$/;
    if ( !nameFilter.test(req.body.username) ) {
        result['code'] = 1;
        result['error'] = 'bad UserName';
        return res.status(400).json(result);
    }

    if( req.body.password.length < 4 || typeof req.body.password !== "string" ) {
        result['code'] = 2;
        result['error'] = 'bad password';
        return res.status(400).json(result);
    }

    Account.findOne({username: req.body.username}, (err, exists) => {
        if (err) throw err;

        if (exists) {
            result['error'] = 'username exists';
            result['code'] = 3;
            return res.status(409).json(result);
        }

        let account = new Account({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            nickname: req.body.nickname,
        });

        account.password = account.generateHash(account.password);

        account.save( err => {
            if (err) throw err;

            result['success'] = true;
            return res.json(result);
        })
    });
});
 
router.post('/signin', (req, res) => {
    var result = {};

    if( typeof req.body.password !== "string" ) {
        result['code'] = 1;
        result['error'] = 'login failed';
        return res.status(401).json(result);
    }

    Account.findOne({username: req.body.username}, (err, account) => {
        if (err) throw err;

        if ( !account ) {
            result['code'] = 1;
            result['error'] = 'login failed';
            return res.status(401).json(result);
        }

        if ( !account.validateHash(req.body.password) ) {
            result['code'] = 1;
            result['error'] = 'login failed';
            return res.status(401).json(result);
        }

        let session = req.session;
        session.loginInfo = {
            _id: account._id,
            id: account.accountId,
            username: account.username,
            nickname: account.nickname,
            role: account.role
        };

        result['success'] = true;
        return res.json(result);
    });

});
 
router.post('/logout', (req, res) => {
    var result = {};
    req.session.destroy(err => { if(err) throw err; });
    result['success'] = true;
    res.json(result);
});

router.put('/', (req, res) => {
    var result = {};

    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    Account.update({accountId: req.body.id}, { $set: req.body }, function(err, output) {
        if (err) throw err;

        if (!output.n) {
            result['error'] = 'not fund user';
            result['code'] = 1;
            return res.status(404).json(result);
        }

        result['success'] = true;
        return res.json(result);
    });
});
 
router.delete('/', (req, res) => {
    var result = {};

    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    Account.remove({}, function(err, output) {
        if (err) throw err;

        if (!output.result.n) {
            result['error'] = 'not fund user';
            result['code'] = 1;
            return res.status(404).json(result);
        }

        result['success'] = true;
        return res.json(result);
    });

});

router.get('/', (req, res) => {
    var result = {};

    if ( !hasParams(req.session, 'loginInfo') ) {
        result['error'] = 'needed login';
        result['code'] = 1;
        return res.status(401).json(result);
    }

    result['info'] = req.session.loginInfo;
    res.json(result);
});

export default router;
