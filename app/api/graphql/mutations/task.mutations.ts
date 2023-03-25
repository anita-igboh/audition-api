import * as service from '../../../services/task.services';
import { TaskCreateInput } from '../args/task.args';

export const createTask = ({ input }: { input: TaskCreateInput }) => {
  const { name, phaseId } = input;

  return service.createTask(name, phaseId);
};

export const updateTaskStatus = ({
  phaseId,
  taskId,
}: {
  phaseId: number;
  taskId: number;
}) => {
  return service.updateTaskStatus({ phaseId, taskId });
};
