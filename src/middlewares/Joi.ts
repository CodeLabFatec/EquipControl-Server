import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IEquipment, IFile } from '../models/Equipment';
import Logging from '../library/Logging';
import { IUser } from '@/models/User';

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
            isActive: Joi.boolean().optional().default(true)
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
            password: Joi.string().required(),
            phone: Joi.string().required(),
            registration: Joi.string().required(),
            cpf: Joi.string().required()
        }),
        update: Joi.object<IUser>({
            name: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().optional(),
            password: Joi.string().optional(),
            phone: Joi.string().optional(),
            registration: Joi.string().optional(),
            cpf: Joi.string().optional()
        }).min(1)
    }
};
