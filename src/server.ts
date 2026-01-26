import express, { Request, Response } from 'express';
import { Pool } from 'pg';
const app = express();
const port = 5000;
// parser
app.use(express.json());

// DB
const pool = new Pool({
  connectionString: `postgresql://neondb_owner:npg_kgWGUXtV78OR@ep-aged-fire-ahl1sikb-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`,
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
