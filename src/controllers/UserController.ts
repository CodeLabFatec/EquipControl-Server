import Logging from '../library/Logging';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import signJWT from '../functions/signJWT';
import generateBiometricToken from '../functions/genereteBiometricToken';
import { decryptPass, encryptPass } from '../functions/encryptor';
import { config } from '../config/config';
import { generateRandomCode } from '../functions/randomCode';
import { sendEmail } from '../functions/sendEmail';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info({ NAMESPACE, message: 'Token validated, user authorized' });

    return res.status(200).json({
        message: 'User authorized',
        jwt: res.locals.jwt
    });
};

const generateBiometricSavedToken = async (req: Request, res: Response, next: NextFunction) => {
    const { userId, active } = req.body;

    return await User.find({ _id: userId })
        .then((users) => {
            if (!users) return res.status(404).json({ message: 'User not found' });

            const user = users[0];

            return generateBiometricToken({ user, active }, (error, token) => {
                if (error) {
                    Logging.error({ NAMESPACE, message: 'Unable to generate Biometric Token', error });

                    return res.status(401).json({
                        message: 'User unauthorized',
                        error
                    });
                } else if (token) {
                    const { password, ...userWithoutPassword } = (user as any)._doc;
                    return res.status(200).json({
                        message: 'Biometric successfully saved',
                        token,
                        user: userWithoutPassword
                    });
                } else {
                    return res.status(401).json({
                        message: 'User unauthorized',
                        error: 'An error occurried when tried to generate Biometric Token'
                    });
                }
            });
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const login = (req: Request, res: Response, next: NextFunction) => {
    let { username, password } = req.body;

    User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(401).json({
                    message: 'User unauthorized'
                });
            }

            const user = users[0];

            const decryptedPass = decryptPass(user.password, config.token.secret);

            if (decryptedPass !== password) {
                Logging.error({ NAMESPACE, message: 'Incorrect password' });

                return res.status(401).json({
                    message: 'User unauthorized',
                    error: 'Incorrect password'
                });
            }

            return signJWT(user, (error, token) => {
                if (error) {
                    Logging.error({ NAMESPACE, message: 'Unable to sign token', error });

                    return res.status(401).json({
                        message: 'User unauthorized',
                        error
                    });
                } else if (token) {
                    const { password, ...userWithoutPassword } = (user as any)._doc;
                    return res.status(200).json({
                        message: 'User successfully authenticated',
                        token,
                        user: userWithoutPassword
                    });
                } else {
                    return res.status(401).json({
                        message: 'User unauthorized',
                        error: 'An error occurried when tried to signJWT'
                    });
                }
            });
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
    User.find()
        .select('-password')
        .exec()
        .then((users) => {
            return res.status(200).json({ users });
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const findUserById = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return await User.findById(userId)
        .select('-password')
        .then((user) => (user ? res.status(200).json({ user }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const register = async (req: Request, res: Response, next: NextFunction) => {
    let { name, lastName, email, username, password, phone, registration, cpf, image, isAdmin } = req.body;

    User.find({ $or: [{ username }, { email }] }).then((user) => {
        if (user.length !== 0) {
            return res.status(500).json({
                message: 'Username or email already exist'
            });
        } else {
            const encryptedPassword = encryptPass(password, config.token.secret);

            const user = new User({
                _id: new mongoose.Types.ObjectId(),
                name,
                lastName,
                email,
                username,
                password: encryptedPassword,
                phone,
                registration,
                cpf,
                image,
                isAdmin
            });

            return user
                .save()
                .then((user) => res.status(201).json({ user }))
                .catch((error) =>
                    res.status(500).json({
                        message: error.message,
                        error
                    })
                );
        }
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .then((user) => {
            if (user) {
                const { password } = req.body;

                user.set(req.body);

                if (password !== null && password !== '' && password !== undefined) {
                    user.password = encryptPass(password, config.token.secret);
                } else {
                    user.password = user.password;
                }

                return user
                    .save()
                    .then((user) => res.status(201).json({ user }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                return res.status(404).json({ message: 'User not found' });
            }
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const deleteUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findByIdAndDelete(userId)
        .select('-password')
        .then((user) => (user ? res.status(201).json({ user, message: 'User Deleted Successfully' }) : res.status(404).json({ message: 'User not found' })))
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const sendRecoverPasswordCode = (req: Request, res: Response) => {
    const { username } = req.params;

    return User.find({ username })
        .exec()
        .then((users) => {
            if (users.length !== 1) {
                return res.status(404).json({
                    message: 'User not found'
                });
            }

            const user = users[0];
            const code = generateRandomCode();

            user.recoverCode = code;

            return user
                .save()
                .then(async (user) => {
                    try {
                        await sendEmail({ to: user.email, subject: 'Recuperação de Senha', text: `Seu código para recuperação de senha da conta no aplicativo EquipControl é: ${code}` });
                    } catch (e) {
                        console.log(e);
                        return res.status(500).json({ message: 'email not sent' });
                    }

                    return res.status(200).json({ success: true });
                })
                .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) =>
            res.status(500).json({
                message: error.message,
                error
            })
        );
};

const recoverPassword = async (req: Request, res: Response) => {
    const { username } = req.params;
    const { password, code } = req.body;

    if (!username || !password || !code) return res.status(400).json({ message: 'username, password and code are required' });

    try {
        const user = await User.findOne({ username });

        if (!user) return res.status(404).json({ message: 'user not found' });
        if (!user.recoverCode || code !== user.recoverCode) return res.status(400).json({ message: 'invalid recover code' });

        const encryptedPassword = encryptPass(password, config.token.secret);

        user.password = encryptedPassword;

        await user.save();

        return res.status(200).json({ success: true });
    } catch (e: any) {
        return res.status(500).json({ message: e.message, e });
    }
};

const changePassword = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { password, newPassword } = req.body;

    if (!id || !password || !newPassword) return res.status(400).json({ message: 'id, password and new password are required' });

    try {
        const user = await User.findById(id);

        if (!user) return res.status(404).json({ message: 'user not found' });

        const decryptedPass = decryptPass(user.password, config.token.secret);
        if (decryptedPass !== password) return res.status(401).json({ message: 'user unauthorized' });

        const encryptedNewPassword = encryptPass(newPassword, config.token.secret);
        user.password = encryptedNewPassword;

        await user.save();

        return res.status(200).json({ success: true });
    } catch (e: any) {
        return res.status(500).json({ message: e.message, e });
    }
};

export default { validateToken, generateBiometricSavedToken, login, getAllUsers, findUserById, register, updateUser, deleteUser, sendRecoverPasswordCode, recoverPassword, changePassword };
