import Logging from '../library/Logging';
import Domain from '../models/Domain';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'Domain';

const getAllDomains = (req: Request, res: Response, next: NextFunction) => {
    Domain.find()
        .exec()
        .then((domains) => {
            return res.status(200).json({ domains });
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const findDomainById = async (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.domainId;

    return await Domain.findById(domainId)
        .then((domain) => (domain ? res.status(200).json({ domain }) : res.status(404).json({ message: 'Domain not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const registerDomain = async (req: Request, res: Response, next: NextFunction) => {
    let { name } = req.body;

    Domain.find({ name }).then((domain) => {
        if (domain.length !== 0) {
            return res.status(500).json({
                message: 'Domain name already exist'
            });
        } else {
            const domain = new Domain({
                _id: new mongoose.Types.ObjectId(),
                name
            });

            return domain
                .save()
                .then((domain) => res.status(201).json({ domain }))
                .catch((error) =>
                    res.status(500).json({
                        message: error.message,
                        error
                    })
                );
        }
    });
};

const createDomain = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const domain = new Domain({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return domain
        .save()
        .then((domain) => res.status(201).json({ domain }))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const updateDomain = (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.domainId;

    return Domain.findById(domainId)
        .then((domain) => {
            if (domain) {
                domain.set(req.body);

                return domain
                    .save()
                    .then((domain) => res.status(201).json({ domain }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'Domain not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const deleteDomain = (req: Request, res: Response, next: NextFunction) => {
    const domainId = req.params.domainId;

    return Domain.findByIdAndDelete(domainId)
        .then((domain) => (domain ? res.status(201).json({ domain, message: 'Domain Deleted Successfully' }) : res.status(404).json({ message: 'Domain not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

export default { getAllDomains, findDomainById, registerDomain, updateDomain, deleteDomain };
