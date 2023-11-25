import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import IUser from '../interfaces/user';
import Logging from '../library/Logging';

const NAMESPACE = 'Authorization';

const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void): void => {
    Logging.info({ NAMESPACE, message: `Attempting to sign token for ${user.username}` });

    try {
        jwt.sign(
            {
                userId: user._id,
                name: `${user.name} ${user.lastName}`,
                username: user.username
            },
            config.token.secret,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256',
                expiresIn: Number(config.token.expireTime)
            },
            (error, token) => {
                if (error) {
                    callback(error, null);
                } else if (token) {
                    callback(null, token);
                }
            }
        );
    } catch (error: any) {
        Logging.error({ NAMESPACE, message: error.message, error });

        callback(error, null);
    }
};

export default signJWT;
