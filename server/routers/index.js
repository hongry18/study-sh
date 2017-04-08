import express from 'express';

import login from './login';
import logout from './logout';

const router = express.Router();

router.use('/login', login);
router.use('/logout', logout);

export default router;
