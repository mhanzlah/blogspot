import { Router } from 'express';
import { register, login, refresh, logout, me } from '../controllers/auth.controller.js';
import { guestOnly } from '../middlewares/guestOnly.js';
import { protect } from '../middlewares/protect.js';

const authRouter = Router();

authRouter.post('/register', guestOnly, register);
authRouter.post('/login', guestOnly, login);
authRouter.post('/refresh', refresh)
authRouter.post('/logout', protect, logout);
authRouter.get('/me', protect, me)

export default authRouter;
