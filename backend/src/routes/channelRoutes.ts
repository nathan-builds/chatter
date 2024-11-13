import express from 'express';
import { createChannel } from '../controllers/channelController';

const router = express.Router();

router.post('/create', createChannel);

export default router;