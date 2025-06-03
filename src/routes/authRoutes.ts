import express from 'express';
const authRoutes = express.Router();
import { userSchema } from '../schema/zod';
import { validate } from '../middlewares/zod';
import { authController, authVerifyController } from '../controllers/authController';

// Route to handle user authentication
authRoutes.post('/auth', validate(userSchema.omit({ otp: true })), authController);
// Route to verify the OTP
authRoutes.post('/auth/verify', validate(userSchema), authVerifyController);

export default authRoutes;