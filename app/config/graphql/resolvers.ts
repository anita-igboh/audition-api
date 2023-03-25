import { createPhase } from '../../api/graphql/mutations/phase.mutations';
import { createTask, updateTaskStatus } from '../../api/graphql/mutations/task.mutations';
import { fetchPhases, fetchSinglePhase } from '../../api/graphql/queries/phase.queries';
import { fetchPhaseTask } from '../../api/graphql/queries/task.queries';

export default {
  phases: fetchPhases,
  phase: fetchSinglePhase,
  phaseCreate: createPhase,
  taskCreate: createTask,
  phaseTask: fetchPhaseTask,
  taskStatusUpdate: updateTaskStatus,
};
