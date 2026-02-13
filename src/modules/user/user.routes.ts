import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userController } from './user.controller';
const router = express.Router();
// localhost:3000/user

router.post('/', userController.userPost);
router.get('/users', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    res.send({
      success: true,
      data: result.rows,
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});
export const userRoutes = router;
