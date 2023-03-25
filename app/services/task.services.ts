import { IPhase } from '../interfaces/phase.interface';
import { ITask } from '../interfaces/task.interface';
import { Error } from '../utils/helpers/response.helpers';
import { fetchSinglePhase } from './phase.services';
import phasesDummy from '../utils/dummy/phases.dummy';
import PhaseStatus from '../enums/phase.enums';

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

export const fetchPhaseTask = ({
  phaseId,
  taskId,
}: {
  phaseId: number;
  taskId: number;
}): ITask => {
  const phase: IPhase = fetchSinglePhase(phaseId);
  const task: ITask | undefined = phase.tasks.find(
    (el: ITask) => el.taskId === Number(taskId),
  );
  if (!task) {
    throw Error('Task not found', 404);
  }

  return task;
};

const getPhaseIndex = (phase: IPhase): number =>
  phasesDummy.findIndex((el) => el.phaseId === phase.phaseId);

const getPreviousPhase = (phase: IPhase): IPhase => {
  const phaseIndex: number = getPhaseIndex(phase);

  return phasesDummy[phaseIndex - 1];
};

const getNextPhase = (phase: IPhase): IPhase => {
  const phaseIndex: number = getPhaseIndex(phase);

  return phasesDummy[phaseIndex + 1];
};

const checkStatusOfPreviousPhase = (phase: IPhase): void => {
  if (phase && !phase.isDone) {
    throw Error('You can only update this task if the previous phase is done', 400);
  }
};

export const updateTaskStatus = ({
  phaseId,
  taskId,
}: {
  phaseId: number;
  taskId: number;
}): ITask => {
  const phase: IPhase = fetchSinglePhase(phaseId);

  if (phase.isDone) {
    throw Error('Phase is completed and cannot be updated', 400);
  }

  const task: ITask = fetchPhaseTask({ taskId, phaseId });

  if (task.isComplete) {
    throw Error('Task is already completed', 400);
  }

  const previousPhase: IPhase = getPreviousPhase(phase);
  const nextPhase: IPhase = getNextPhase(phase);
  checkStatusOfPreviousPhase(previousPhase);
  task.isComplete = true;

  // if all tasks in current phase are completed, unlock next phase
  phase.isDone = phase.tasks.every((el) => el.isComplete);
  if (nextPhase && phase.isDone) {
    nextPhase.status = PhaseStatus.UNLOCKED;
  }

  return task;
};
