import User from '../models/User';
import Equipment from '../models/Equipment';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Domain from '../models/Domain';

const createEquipment = async (req: Request, res: Response, next: NextFunction) => {
    const { name, latitude, longitude, domain, serial, notes, files, created_by } = req.body;

    const createdByUser = await User.findOne({ _id: created_by.id }).select('-password');

    if (!createdByUser) {
        return res.status(404).json({ message: 'User not found' });
    }

    const equipmentDomain = await Domain.findById(domain);

    if (!equipmentDomain) {
        return res.status(404).json({ message: 'Domain not found' });
    }

    const equipment = new Equipment({
        _id: new mongoose.Types.ObjectId(),
        name,
        latitude,
        longitude,
        domain: equipmentDomain,
        serial,
        notes,
        files,
        created_by: {
            id: created_by.id,
            name: `${createdByUser.name} ${createdByUser.lastName}`
        }
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
        .then(async (equipment) => {
            equipment ? res.status(200).json({ equipment }) : res.status(404).json({ message: 'Equipment not found' });
        })
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

const listAllEquipmentsLocation = (req: Request, res: Response, next: NextFunction) => {
    return Equipment.find()
        .select('_id name latitude longitude isActive') // Seleciona apenas as propriedades desejadas
        .then((equipments) => res.status(200).json({ equipments }))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const getEquipmentHistory = (req: Request, res: Response, next: NextFunction) => {
    const { equipmentId } = req.params;

    return Equipment.findById(equipmentId)
        .select('_id history')
        .then(async (equipment) => {
            equipment ? res.status(200).json({ history: equipment.history }) : res.status(404).json({ message: 'Equipment not found' });
        })
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
        .then(async (equipment) => {
            if (equipment) {
                const { domain } = req.body;

                equipment.set(req.body);

                if (domain) {
                    const equipmentDomain = await Domain.findById(domain);
                    if (!equipmentDomain) {
                        return res.status(404).json({ message: 'Domain not found' });
                    }

                    equipment.domain = equipmentDomain;
                }

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
    const { isActive } = req.body;
    const { userId, name } = res.locals.jwt;

    if (isActive === undefined || isActive === null) {
        return res.status(400).json({ message: 'isActive is required for this operation' });
    }

    return Equipment.findById(equipmentId)
        .then((equipment) => {
            if (equipment) {
                const status = isActive ? 'ATIVO' : 'INATIVO';

                const options: Intl.DateTimeFormatOptions = {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };

                const historyEntry = {
                    userId,
                    userName: name,
                    isActive: isActive,
                    status: status,
                    date: new Date().toLocaleDateString('pt-BR', options)
                };

                equipment.isActive = isActive;
                equipment.history.push(historyEntry);

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

export default { createEquipment, findEquipmentById, listAllEquipments, listAllEquipmentsLocation, getEquipmentHistory, updateEquipment, deleteEquipment, changeEquipmentStatus };
