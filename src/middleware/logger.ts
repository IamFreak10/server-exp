import { Request, Response, NextFunction } from "express";

const loger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} \n`);
  next();
};
export default loger;