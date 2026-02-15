import { Router } from 'express';
import { authController } from './auth.controller';

const router = Router();
router.get('/login', authController.loginUser);
export const authRoutes = router;
