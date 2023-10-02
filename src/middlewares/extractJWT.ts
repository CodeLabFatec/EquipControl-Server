import { config } from '../config/config';
import Logging from '../library/Logging';
import { Request, Response, NextFunction } from 'express-serve-static-core';
import jwt from 'jsonwebtoken';

const NAMESPACE = 'Authorization';

const extractJWT = (req: Request, res: Response, next: NextFunction) => {
    Logging.info({ NAMESPACE, message: 'Validating Token' });

    let token = req.headers.authorization?.split(' ')[1];

    if (token) {
        jwt.verify(token, config.token.secret, (error, decoded) => {
            if (error) {
                res.status(404).json({
                    message: error.message,
                    error
                });
            } else {
                console.log(decoded)
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

export default extractJWT;
