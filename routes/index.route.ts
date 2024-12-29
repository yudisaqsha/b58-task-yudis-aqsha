import express, { Request, Response } from 'express';
import userRoute from './users';
import authRoute from './auth';
import threadRoute from './thread';

const router = express.Router();

router.use('/users', userRoute);
router.use('/auth', authRoute);
router.use('/thread', threadRoute);

export default router;