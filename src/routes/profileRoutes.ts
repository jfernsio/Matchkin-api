import express from 'express';

import { clientProfile, consultantProfile } from '../controllers/profileController';
import { validate } from '../middlewares/zod';
import { clientSchema,consultantSchema } from '../schema/zod';
import roleMiddleware from '../middlewares/role';
import authMiddleware from '../middlewares/auth';
const profileRoutes = express.Router();

profileRoutes.post('/client',authMiddleware, roleMiddleware(['client']), validate(clientSchema), clientProfile);

profileRoutes.post('/consultant', authMiddleware,roleMiddleware(['consultant']), validate(consultantSchema.omit({ user: true })), consultantProfile);

export default profileRoutes;