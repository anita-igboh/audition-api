import * as service from '../../../services/phase.services';

export const fetchPhases = service.fetchPhases();

export const fetchSinglePhase = ({ id }: { id: number }) => service.fetchSinglePhase(id);
