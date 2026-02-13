import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userController } from './user.controller';
const router = express.Router();
// localhost:3000/user

router.post('/', userController.userPost);
router.get('/',userController.getUser);
export const userRoutes = router;
