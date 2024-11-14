import express from 'express';
import { registerUser, login, getUserChannels } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/channels:/userId', getUserChannels)


export default router;