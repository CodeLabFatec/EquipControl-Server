import express from 'express';
import controller from '../controllers/DomainController';
import { Schemas, ValidateJoi } from '../middlewares/Joi';

const router = express.Router();

router.post('/registerDomain', ValidateJoi(Schemas.domain.create), controller.registerDomain);
router.get('/get/:domainId', controller.findDomainById);
router.get('/getAllDomains', controller.getAllDomains);
router.patch('/update/:domainId', ValidateJoi(Schemas.domain.update), controller.updateDomain);
router.delete('/delete/:domainId', controller.deleteDomain);

export = router;
