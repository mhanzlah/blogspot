import { Router } from 'express';
import * as authController from '../controllers/auth.controller.js';
import asyncHandler from '../middlewares/asyncHandler.js';
import authMiddleware from '../middlewares/auth.middleware.js';
import guestMiddleware from '../middlewares/guest.middleware.js';

const authRouter = Router();

authRouter.post('/register', guestMiddleware, asyncHandler(authController.register));
authRouter.post('/login', guestMiddleware, asyncHandler(authController.login));
authRouter.post('/logout', authMiddleware, asyncHandler(authController.logout));
authRouter.get('/me', authMiddleware, asyncHandler(authController.me))
authRouter.get('/refresh', authMiddleware, asyncHandler(authController.refresh))

export default authRouter;
