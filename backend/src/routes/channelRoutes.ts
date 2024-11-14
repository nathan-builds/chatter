import express from 'express';
import { createChannel, getAllMessages } from '../controllers/channelController';

const router = express.Router();

router.post('/create', createChannel);
router.get('/messages/:channelId',getAllMessages)
router.get('/')

export default router;