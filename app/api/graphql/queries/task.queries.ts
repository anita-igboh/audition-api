import * as service from '../../../services/task.services';

export const fetchPhaseTask = ({
  phaseId,
  taskId,
}: {
  phaseId: number;
  taskId: number;
}) => {
  return service.fetchPhaseTask({ taskId, phaseId });
};
