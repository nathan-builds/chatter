import express from 'express';
import { registerUser, login, getUserChannels, getUserFriends } from '../controllers/userController';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.get('/channels/:userId', getUserChannels);
router.get('/friends/:userId', getUserFriends);


export default router;