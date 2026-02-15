import { Request, Response } from 'express';
import { authService } from './auth.service';

const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await authService.loginUser(
      req.body.email,
      req.body.password
    );
    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    }

    res.status(201).json({
      success: true,
      message: "Login successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const authController = {
  loginUser,
};
