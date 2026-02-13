import { pool } from '../../config/db';

const createUser = async (email: string, name: string) => {
  const result = await pool.query(
    `INSERT INTO users (email,name) VALUES ($1,$2) RETURNING *`,
    [email, name]
  );

  return result;
};
const getUser = async () => {
  
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

export const userService = {
  createUser,
  getUser,
};
