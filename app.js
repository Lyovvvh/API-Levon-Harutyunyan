import './envInformaition/initEnv.js';
import express from 'express';
import router from './routes/usersRouter.js'
import taskRouter from "./routes/taskRouter.js";
const app = express();
app.use(express.json());

app.use('/users',router)
app.use('/tasks',taskRouter)

app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
});