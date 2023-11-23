import express from 'express';
import controller from '../controllers/UserController';
import extractJWT from '../middlewares/extractJWT';
import extractBiometricJWT from '../middlewares/extractBiometricJWT';

const router = express.Router();

router.get('/validate', extractJWT, controller.validateToken);
router.get('/validateBiometric/:biometricSecret', extractBiometricJWT, controller.validateToken);
router.post('/login', controller.login);
router.post('/sendRecoverPasswordCode/:username', controller.sendRecoverPasswordCode);
router.post('/recoverPassword/:username', controller.recoverPassword);

export = router;
