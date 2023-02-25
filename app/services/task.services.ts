import { IPhase } from '../interfaces/phase.interface';
import { ITask } from '../interfaces/task.interface';
import { Error } from '../utils/helpers/response.helpers';
import { fetchSinglePhase } from './phase.services';

  export const createTask = (taskName: string, phaseId: number): IPhase => {
    const phase = fetchSinglePhase(phaseId);
    if (phase.isDone === true) {
      throw Error('The tasks for this phase have already been completed', 400);
    }
    phase.tasks.push({
      taskId: phase.tasks.length + 1,
      taskName,
      isComplete: false,
    });
    
    return phase;
  };

  export const fetchPhaseTask = (taskId: number, phaseId: number): ITask => {
    const phase: IPhase = fetchSinglePhase(phaseId);
    const task: ITask | undefined = phase.tasks.find((el: ITask) => el.taskId === Number(taskId));
    if (!task) {
      throw Error('Task not found', 404);
    }

    return task;
  };