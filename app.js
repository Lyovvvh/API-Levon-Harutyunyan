import './envInformaition/initEnv.js';
import express from 'express';
import router from './routes/usersRouter.js'
const app = express();
app.use(express.json());

app.use('/users',router)
// app.use('/tasks',)

app.listen(process.env.PORT, () => {
    console.log('server listening on port', process.env.PORT);
});