import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import IUser from '../interfaces/user';
import Logging from '../library/Logging';
import { decryptPass } from './encryptor';

const NAMESPACE = 'Authorization';

const genereteBiometricToken = (data: { user: IUser; active: boolean }, callback: (error: Error | null, token: string | null) => void): void => {
    const { user, active } = data;

    Logging.info({ NAMESPACE, message: `Attempting to generate biometric token for ${user.username}` });

    try {
        const pass = decryptPass(user.password, config.token.secret);

        jwt.sign(
            {
                userId: user._id,
                username: user.username,
                active: active,
                password: pass
            },
            user.username,
            {
                issuer: config.token.issuer,
                algorithm: 'HS256'
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

export default genereteBiometricToken;
