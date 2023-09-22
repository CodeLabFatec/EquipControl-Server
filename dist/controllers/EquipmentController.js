"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Equipment_1 = __importDefault(require("../models/Equipment"));
const mongoose_1 = __importDefault(require("mongoose"));
const createEquipment = (req, res, next) => {
    const { name, latitude, longitude, domain, serial, notes, files } = req.body;
    const equipment = new Equipment_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name,
        latitude,
        longitude,
        domain,
        serial,
        notes,
        files
    });
    return equipment
        .save()
        .then((equipment) => res.status(201).json({ equipment }))
        .catch((error) => res.status(500).json({ error }));
};
const findEquipmentById = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    return Equipment_1.default.findById(equipmentId)
        .then((equipment) => (equipment ? res.status(200).json({ equipment }) : res.status(404).json({ message: 'Equipment not found' })))
        .catch((error) => res.status(500).json({ error }));
};
const listAllEquipments = (req, res, next) => {
    return Equipment_1.default.find()
        .then((equipments) => res.status(200).json({ equipments }))
        .catch((error) => res.status(500).json({ error }));
};
const updateEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    return Equipment_1.default.findById(equipmentId)
        .then((equipment) => {
        if (equipment) {
            equipment.set(req.body);
            return equipment
                .save()
                .then((equipment) => res.status(201).json({ equipment }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            return res.status(404).json({ message: 'Equipment not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
const deleteEquipment = (req, res, next) => {
    const equipmentId = req.params.equipmentId;
    return Equipment_1.default.findByIdAndDelete(equipmentId)
        .then((equipment) => (equipment ? res.status(201).json({ equipment, message: 'Equipment Deleted Successfully' }) : res.status(404).json({ message: 'Equipment not found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = { createEquipment, findEquipmentById, listAllEquipments, updateEquipment, deleteEquipment };
