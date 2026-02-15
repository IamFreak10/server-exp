import express, { Request, Response } from 'express';

import config from './config';
import initDB, { pool } from './config/db';
import loger from './middleware/logger';
import { userRoutes } from './modules/user/user.routes';
import { todoRoutes } from './modules/todo/todo.routes';
import {  authRoutes } from './modules/auth/auth.routes';

export const app = express();
const port = config.port;
// parser
app.use(express.json());
/* 
sudo sysctl -w net.ipv6.conf.all.disable_ipv6=1
sudo sysctl -w net.ipv6.conf.default.disable_ipv6=1

*/
// DB

initDB();
// logger midlleware

app.get('/', loger, (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.use('/users', userRoutes);

// todos crud
app.use('/todos', todoRoutes);

//?AUTH ROUTES\
app.use('/auth', authRoutes);
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.path,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
