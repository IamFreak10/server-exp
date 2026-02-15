import { pool } from '../../config/db';
import bcrypT from 'bcrypt';
const createUser = async (payload: Record<string, unknown>) => {
  const { email, name, password } = payload;
  console.log(email, name, password);
  const hashPassword = await bcrypT.hash(password as string, 10);
  console.log(hashPassword);
  const result = await pool.query(
    `INSERT INTO users (email,name,password) VALUES ($1,$2,$3) RETURNING *`,
    [email, name, hashPassword]
  );

  return result;
};
const getUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};
const getSingleUser = async (id: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};
const updateUser = async (id: string, email: string, name: string) => {
  const result = await pool.query(
    `UPDATE users SET email=$1,name=$2 WHERE id=$3 RETURNING *`,
    [email, name, id]
  );
  return result;
};
const deleteUser = async (id: string) => {
  const result = await pool.query(
    `DELETE FROM users WHERE id=$1
      RETURNING *
      `,
    [id]
  );
  return result;
  //!Todo
};
export const userService = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
