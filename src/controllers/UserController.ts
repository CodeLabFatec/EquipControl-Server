import Logging from '../library/Logging';
import User from '../models/User';
import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import signJWT from '../functions/signJWT';

const NAMESPACE = 'User';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
    Logging.info({ NAMESPACE, message: 'Token validated, user authorized' });

    return res.status(200).json({
        message: 'User authorized',
        jwt: res.locals.jwt
    });
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

            bcryptjs.compare(password, user.password, (error, result) => {
                if (error) {
                    Logging.error({ NAMESPACE, message: error.message, error });

                    return res.status(401).json({
                        message: 'User unauthorized',
                        error
                    });
                } else if (result) {
                    return signJWT(user, (_error, token) => {
                        if (_error) {
                            Logging.error({ NAMESPACE, message: 'Unable to sign token', _error });

                            return res.status(401).json({
                                message: 'User unauthorized',
                                error: _error
                            });
                        } else if (token) {
                            const { password, ...userWithoutPassword } = (user as any)._doc;
                            return res.status(200).json({
                                message: 'User successfully authenticated',
                                token,
                                user: userWithoutPassword
                            });
                        }
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
    let { name, lastName, email, username, password, phone, registration, cpf, image } = req.body;

    User.find({ $or: [{ username }, { email }] }).then((user) => {
        if (user.length !== 0) {
            return res.status(500).json({
                message: 'Username or email already exist'
            });
        } else {
            bcryptjs.hash(password, 10, (hashError, hash) => {
                if (hashError) {
                    return res.status(500).json({
                        message: hashError.message,
                        error: hashError
                    });
                }

                const user = new User({
                    _id: new mongoose.Types.ObjectId(),
                    name,
                    lastName,
                    email,
                    username,
                    password: hash,
                    phone,
                    registration,
                    cpf,
                    image
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
            });
        }
    });
};

const updateUser = (req: Request, res: Response, next: NextFunction) => {
    const userId = req.params.userId;

    return User.findById(userId)
        .select('-password')
        .then((user) => {
            if (user) {
                user.set(req.body);

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

export default { validateToken, login, getAllUsers, findUserById, register, updateUser, deleteUser };
