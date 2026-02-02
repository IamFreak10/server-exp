import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
  connectionString: `${config.connection_str}`,
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
export default initDB;

