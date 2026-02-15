import express, { Request, Response } from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';
const router = express.Router();
// localhost:3000/user

router.post('/', userController.userPost);
router.get('/', auth(), userController.getUser);
router.get('/:id', userController.getSingleUser);
router.put('/:id', userController.updateSingleUser);
router.delete('/:id', userController.deleteSingleUser);
export const userRoutes = router;
