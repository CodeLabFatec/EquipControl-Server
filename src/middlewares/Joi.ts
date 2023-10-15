import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import Logging from '../library/Logging';
import IUser from '../interfaces/user';
import IEquipment, { ICreatedBy } from '../interfaces/equipment';
import IDomain from '../interfaces/domain';

export const ValidateJoi = (schema: ObjectSchema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validateAsync(req.body);

            next();
        } catch (error) {
            Logging.error(error);

            return res.status(422).json({ error });
        }
    };
};

export const Schemas = {
    equipment: {
        create: Joi.object<IEquipment>({
            name: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            domain: Joi.string().required(),
            serial: Joi.string().required(),
            notes: Joi.string().allow('').optional(),
            files: Joi.array()
                .items({
                    base64: Joi.string().required(),
                    type: Joi.string().required()
                })
                .empty(Joi.array().length(0))
                .allow(null)
                .default([]),
            isActive: Joi.boolean().optional().default(true),
            created_by: Joi.object<ICreatedBy>({
                id: Joi.string().required(),
                name: Joi.string().optional()
            }).required()
        }),
        update: Joi.object<IEquipment>({
            name: Joi.string().required(),
            latitude: Joi.string().required(),
            longitude: Joi.string().required(),
            domain: Joi.string().required(),
            serial: Joi.string().required(),
            notes: Joi.string().allow('').optional(),
            files: Joi.array()
                .items({
                    base64: Joi.string().required(),
                    type: Joi.string().required()
                })
                .empty(Joi.array().length(0))
                .allow(null)
                .default([]),
            isActive: Joi.boolean().optional()
        }),
        updateStatus: Joi.object<IEquipment>({
            isActive: Joi.boolean().required()
        })
    },
    user: {
        create: Joi.object<IUser>({
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required(),
            username: Joi.string().required(),
            password: Joi.string().required(),
            phone: Joi.string().required(),
            registration: Joi.string().required(),
            cpf: Joi.string().required(),
            image: Joi.object().optional(),
            isAdmin: Joi.boolean().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().optional(),
            username: Joi.string().optional(),
            password: Joi.string().optional(),
            phone: Joi.string().optional(),
            registration: Joi.string().optional(),
            cpf: Joi.string().optional(),
            image: Joi.object().optional(),
            isAdmin: Joi.boolean().required()
        }).min(1)
    },
    domain: {
        create: Joi.object<IDomain>({
            name: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().optional()
        }).min(1)
    }
};
