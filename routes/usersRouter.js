import express from 'express';
import validate from '../middlewares/validate.js';
import schema from '../schemas/users.js';
import userController from '../controllers/usersController.js';

const router = express.Router();
router.post('/registration', validate(schema.register, 'body'),userController.registration )

export default router;