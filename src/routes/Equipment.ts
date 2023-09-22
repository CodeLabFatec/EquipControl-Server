import express from 'express';
import controller from '../controllers/EquipmentController';
import { Schemas, ValidateJoi } from '../middlewares/Joi';

const router = express.Router();

router.post('/create', ValidateJoi(Schemas.equipment.create), controller.createEquipment);
router.get('/get/:equipmentId', controller.findEquipmentById);
router.get('/get', controller.listAllEquipments);
router.patch('/update/:equipmentId', ValidateJoi(Schemas.equipment.update), controller.updateEquipment);
router.delete('/delete/:equipmentId', controller.deleteEquipment);

export = router;
