import express, { NextFunction, Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });
const app = express();
const port = 5000;
// parser
app.use(express.json());
/* 
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1

*/
// DB
const pool = new Pool({
  connectionString: process.env.CONNECTION_STR,
  ssl: {
    // Neon uses valid certificates, but 'rejectUnauthorized: false'
    // is a common "quick fix" for local dev environments.
    rejectUnauthorized: false,
  },
  // Since you got a timeout, let's give the handshake more time
  connectionTimeoutMillis: 1000000,
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        age INT,
        pone VARCHAR(255),
        address TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
    )    
    
    `);
  await pool.query(`
        CREATE TABLE IF NOT EXISTS TODOS (
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(255) NOT NULL,
            description TEXT,
            completed BOOLEAN DEFAULT false,
            due_date DATE,
            created_at TIMESTAMP DEFAULT NOW(),
            updated_at TIMESTAMP DEFAULT NOW()
        )
        
    `);
};

initDB();
// logger midlleware
const loger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} \n`);
  next();
};
app.get('/', loger,(req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/users', async (req: Request, res: Response) => {
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
app.get('/users', async (req: Request, res: Response) => {
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
app.get('/users/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [id]);
    res.send({
      success: true,
      data: result.rows[0],
    });
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});
app.delete('/users/:id', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const result = await pool.query(
      `DELETE FROM users WHERE id=$1
      RETURNING *
      `,
      [req.params.id]
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: 'User Not found',
      });
    } else {
      res.status(200).json({
        success: true,
        message: 'User deleted successfully',
        data: result.rows,
      });
    }
  } catch (e: any) {
    res.status(500).json({
      success: false,
      message: e.message,
    });
  }
});

app.post('/todos', async (req: Request, res: Response) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO todos (title,description) VALUES ($1,$2) RETURNING *`,
      [title, description]
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
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
