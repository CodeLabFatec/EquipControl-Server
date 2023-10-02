import express from 'express';
import controller from '../controllers/UserController';
import { Schemas, ValidateJoi } from '../middlewares/Joi';
import extractJWT from '../middlewares/extractJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.post('/login', controller.login);
router.post('/register', ValidateJoi(Schemas.user.create), controller.register);
router.get('/get/:userId', controller.findUserById);
router.get('/getAllUsers', controller.getAllUsers);
router.patch('/update/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
