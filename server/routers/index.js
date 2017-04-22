import express from 'express';
import auth from '~/routers/auth';
import memo from '~/routers/memo';


const router = express.Router();
router.use('/auth', auth);
router.use('/memo', memo);

export default router;
