import express from 'express';

import account from '~/routers/account';

const router = express.Router();
router.use('/users', account);

export default router;
