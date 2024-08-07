import express from 'express';
import validate from '../middlewares/validate.js';
import schema from '../schemas/users.js';
import userController from '../controllers/usersController.js';
import checkToken from "../middlewares/checkToken.js";

const router = express.Router();
router.post('/registration', validate(schema.register, 'body'),userController.registration )
router.post('/login', validate(schema.login, 'body'),userController.login )
router.get('/profile',checkToken, validate(schema.getProfile, 'body'),userController.getProfile )
router.put('/update',checkToken, validate(schema.updateProfile, 'body'),userController.update )
router.delete('/delete',checkToken, validate(schema.deleteProfile, 'body'),userController.delete )

export default router;