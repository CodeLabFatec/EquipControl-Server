import Equipment from '../models/Equipment';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

const createEquipment = (req: Request, res: Response, next: NextFunction) => {
    const { name, latitude, longitude, domain, serial, notes, files } = req.body;

    const equipment = new Equipment({
        _id: new mongoose.Types.ObjectId(),
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
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const findEquipmentById = (req: Request, res: Response, next: NextFunction) => {
    const equipmentId = req.params.equipmentId;

    return Equipment.findById(equipmentId)
        .then((equipment) => (equipment ? res.status(200).json({ equipment }) : res.status(404).json({ message: 'Equipment not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const listAllEquipments = (req: Request, res: Response, next: NextFunction) => {
    return Equipment.find()
        .then((equipments) => res.status(200).json({ equipments }))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const updateEquipment = (req: Request, res: Response, next: NextFunction) => {
    const equipmentId = req.params.equipmentId;

    return Equipment.findById(equipmentId)
        .then((equipment) => {
            if (equipment) {
                equipment.set(req.body);

                return equipment
                    .save()
                    .then((equipment) => res.status(201).json({ equipment }))
                    .catch((error) =>
                        res.status(500).json({
                            message: error.message,
                            error
                        })
                    );
            } else {
                return res.status(404).json({ message: 'Equipment not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const deleteEquipment = (req: Request, res: Response, next: NextFunction) => {
    const equipmentId = req.params.equipmentId;

    return Equipment.findByIdAndDelete(equipmentId)
        .then((equipment) => (equipment ? res.status(201).json({ equipment, message: 'Equipment Deleted Successfully' }) : res.status(404).json({ message: 'Equipment not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const changeEquipmentStatus = (req: Request, res: Response, next: NextFunction) => {
    const equipmentId = req.params.equipmentId;
    const isActive = req.body.isActive;

    if (isActive === undefined || isActive === null) {
        return res.status(400).json({ message: 'isActive is required for this operation' });
    }

    return Equipment.findById(equipmentId)
        .then((equipment) => {
            if (equipment) {
                equipment.isActive = isActive;

                return equipment
                    .save()
                    .then((equipment) => res.status(201).json({ equipment }))
                    .catch((error) =>
                        res.status(500).json({
                            message: error.message,
                            error
                        })
                    );
            } else {
                return res.status(404).json({ message: 'Equipment not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

export default { createEquipment, findEquipmentById, listAllEquipments, updateEquipment, deleteEquipment, changeEquipmentStatus };
