import express from 'express';

import { account } from './users';
import { post } from './posts';

const router = express.Router();

// set account
router.use('/account', account);

// set post
router.use('/post', post);

export default router;
