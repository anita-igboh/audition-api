import * as service from '../../../services/phase.services';
import { PhaseCreateInput } from '../args/phase.args';

export const createPhase = ({ input: { name } }: { input: PhaseCreateInput }) => {
  return service.createPhase(name);
};
