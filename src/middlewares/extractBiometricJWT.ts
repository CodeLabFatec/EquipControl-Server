import Logging from '../library/Logging';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Authorization';

const extractBiometricJWT = (req: Request, res: Response, next: NextFunction) => {
    Logging.info({ NAMESPACE, message: 'Validating Biometric Token' });

    const token = req.headers.authorization?.split(' ')[1];

    const biometricSecret = req.params.biometricSecret?.toString() ?? null;
    
    if (!biometricSecret) {
        return res.status(400).json({ message: 'Biometric Secret is required for this operation' });
    }

    if (token) {
        jwt.verify(token, biometricSecret, (error, decoded) => {
            if (error) {
                res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                res.locals.jwt = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            message: 'User unauthorized'
        });
    }
};

export default extractBiometricJWT;
