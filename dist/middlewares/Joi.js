"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schemas = exports.ValidateJoi = void 0;
const joi_1 = __importDefault(require("joi"));
const Logging_1 = __importDefault(require("../library/Logging"));
const ValidateJoi = (schema) => {
    return async (req, res, next) => {
        try {
            await schema.validateAsync(req.body);
            next();
        }
        catch (error) {
            Logging_1.default.error(error);
            return res.status(422).json({ error });
        }
    };
};
exports.ValidateJoi = ValidateJoi;
exports.Schemas = {
    equipment: {
        create: joi_1.default.object({
            name: joi_1.default.string().required(),
            latitude: joi_1.default.number().required(),
            longitude: joi_1.default.number().required(),
            domain: joi_1.default.string().optional(),
            serial: joi_1.default.string().optional(),
            notes: joi_1.default.string().optional(),
            files: joi_1.default.array()
                .items({
                base64: joi_1.default.string().required(),
                type: joi_1.default.string().required()
            })
                .allow(null)
                .default([])
        }),
        update: joi_1.default.object({
            name: joi_1.default.string().required(),
            latitude: joi_1.default.number().required(),
            longitude: joi_1.default.number().required(),
            domain: joi_1.default.string().optional(),
            serial: joi_1.default.string().optional(),
            notes: joi_1.default.string().optional(),
            files: joi_1.default.array()
                .items({
                base64: joi_1.default.string().required(),
                type: joi_1.default.string().required()
            })
                .allow(null)
                .default([])
        })
    }
};
