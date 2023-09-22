"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const EquipmentController_1 = __importDefault(require("../controllers/EquipmentController"));
const Joi_1 = require("../middlewares/Joi");
const router = express_1.default.Router();
router.post('/create', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.equipment.create), EquipmentController_1.default.createEquipment);
router.get('/get/:equipmentId', EquipmentController_1.default.findEquipmentById);
router.get('/get', EquipmentController_1.default.listAllEquipments);
router.patch('/update/:equipmentId', (0, Joi_1.ValidateJoi)(Joi_1.Schemas.equipment.update), EquipmentController_1.default.updateEquipment);
router.delete('/delete/:equipmentId', EquipmentController_1.default.deleteEquipment);
module.exports = router;
