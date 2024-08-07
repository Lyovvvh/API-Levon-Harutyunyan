import express from 'express';
import validate from '../middlewares/validate.js';
import schema from '../schemas/tasks.js';
import taskController from '../controllers/tasksController.js';
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();

router.post('/create',checkToken, validate(schema.create, 'body'), taskController.createTask);
router.get('/list',checkToken, validate(schema.getList, 'body'), taskController.getList);
router.get('/single',checkToken, validate(schema.getTask, 'body'), taskController.getSingleTask);
router.put('/update',checkToken, validate(schema.update, 'body'), taskController.updateTask);
router.delete('/delete',checkToken, validate(schema.delete, 'body'), taskController.deleteTask);

export default router;
