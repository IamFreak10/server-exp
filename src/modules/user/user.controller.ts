// sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
// sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1

import { Request, Response } from 'express';
import { pool } from '../../config/db';
import { userService } from './user.service';

const userPost = async (req: Request, res: Response) => {
  const { email, name } = req.body;
  try {
    const result = await userService.createUser(email, name);
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
};

const getUser= async (req: Request, res: Response) => {
  try {
    const result = await userService.getUser();
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
}
export const userController = {
  userPost,
  getUser
};
