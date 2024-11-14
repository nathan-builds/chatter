import express from 'express';
import { sendMessage } from '../controllers/msgController';

const router = express.Router();

router.post('/send', sendMessage);


export default router;