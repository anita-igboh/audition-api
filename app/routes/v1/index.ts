import { Router, Request, Response } from 'express';
import * as phaseController from '../../controllers/phase.controllers';
import * as phaseValidator from '../../utils/validations/phase.validation';


const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    code: 200,
    message: 'Welcome to Audition app',
  });
});

router.get('/phases', phaseController.fetchPhases);

router.get('/phases/:phaseId', phaseValidator.phaseParams, phaseController.fetchSinglePhase);

router.post('/phases', phaseValidator.createPhase, phaseController.createPhase);

export default router;