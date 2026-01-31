import express, { Request, Response } from 'express';
import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config({path:path.join(process.cwd(),'.env')});
const app = express();
const port = 5000;
// parser
app.use(express.json());

// DB
const pool = new Pool({
  connectionString: process.env.CONNECTION_STR,
  ssl: {
    // Neon uses valid certificates, but 'rejectUnauthorized: false' 
    // is a common "quick fix" for local dev environments.
    rejectUnauthorized: false, 
  },
  // Since you got a timeout, let's give the handshake more time
  connectionTimeoutMillis: 10000, 
});

const initDB = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
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

// app.get('/', (req: Request, res: Response) => {
//   res.send('Hello World!');
// });

// app.post('/', (req: Request, res: Response) => {
//   console.log(req.body);
//   res.status(200).json({
//     status: 'success',
//     message: 'API is WORKING',
//     path: req.path,
//   });
// });
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
