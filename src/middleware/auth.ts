import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';
// Higher order  function
const auth = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.headers.authorization;
    if(!token){
      return res.status(500).json({
       message:"You are not authenticated"
      });
    }
    const decodedToken=jwt.verify(token,config.jwtSecret as string);
    console.log({ decodedToken });
    return next();
  };
};

export default auth;
