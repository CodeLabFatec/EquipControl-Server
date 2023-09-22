import Joi, { ObjectSchema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { IEquipment, IFile } from '../models/Equipment';
import Logging from '../library/Logging';

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
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            domain: Joi.string().required(),
            serial: Joi.string().required(),
            notes: Joi.string().optional(),
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
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            domain: Joi.string().required(),
            serial: Joi.string().required(),
            notes: Joi.string().optional(),
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
    }
};
