import express from 'express';
import dotenv from 'dotenv';
import db from './clients/db.mysql.js'
import router from './routes/usersRouter.js'
dotenv.config();
const app = express();

app.use(express.json());

app.use('/users',router)
// app.use('/tasks',)

app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
});