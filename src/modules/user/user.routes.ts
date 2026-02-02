import express, { Request, Response } from 'express';
import { pool } from '../../config/db';
const router = express.Router();
// localhost:3000/user
router.post('/', async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users (email,name) VALUES ($1,$2) RETURNING *`,
      [email, name]
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User updated successfully',
        data: result.rows[0],
      });
    }
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});
export const userRoutes = router;
