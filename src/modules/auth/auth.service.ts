
import config, { bcrypt } from '../../config';
import { pool } from '../../config/db';
import jwt from 'jsonwebtoken';
const loginUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1 `, [
    email,
  ]);
  // console.log(result)
  if (result.rows.length === 0) {
    return null;
  }
  const user = result.rows[0];
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return null;
  }


 const token=jwt.sign({name:user.name,email:user.email},config.jwtSecret as string,{
  expiresIn:"7d"
 });
return{token,user};
};


export const authService = {
  loginUser,
};