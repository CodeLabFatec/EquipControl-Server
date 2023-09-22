import express from 'express';
import controller from '../controllers/UserController';
import { Schemas, ValidateJoi } from '../middlewares/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.user.create), controller.createUser);
router.get('/get/:userId', controller.findUserById);
router.get('/get', controller.listAllUsers);
router.patch('/update/:userId', ValidateJoi(Schemas.user.update), controller.updateUser);
router.delete('/delete/:userId', controller.deleteUser);

export = router;
