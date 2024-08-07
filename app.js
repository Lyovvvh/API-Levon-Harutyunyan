import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import router from './routes/usersRouter.js'
// console.log(process.env);
const app = express();

app.use(express.json());

app.use('/users',router)
// app.use('/tasks',)

app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
});