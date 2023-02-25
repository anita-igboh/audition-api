import { Router, Request, Response } from 'express';
import * as phaseController from '../../controllers/phase.controllers';
import * as phaseValidator from '../../utils/validations/phase.validation';
import * as taskController from '../../controllers/task.controllers';
import * as taskValidator from '../../utils/validations/task.validation';



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

router.post('/phases/tasks', taskValidator.createTask, taskController.createTask);

router.get('/phases/tasks/:phaseId/:taskId', taskValidator.phaseTaskParams, taskController.fetchPhaseTask);

router.patch('/phases/tasks/:phaseId/:taskId', taskValidator.phaseTaskParams, taskController.updateTaskStatus);




export default router;