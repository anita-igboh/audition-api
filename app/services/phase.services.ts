import { IPhase } from '../interfaces/phase.interface';
import phasesDummy from '../utils/dummy/phases.dummy';
import { Error } from '../utils/helpers/response.helpers';
import PhaseStatus from '../enums/phase.enums';

export const fetchPhases = (): IPhase[] => phasesDummy;

export const fetchSinglePhase = (phaseId: number): IPhase => {
  const data: IPhase | undefined = phasesDummy.find(
    (phase: IPhase) => phase.phaseId === phaseId,
  );
  if (!data) {
    throw Error('Phase not found', 404);
  }

  return data;
};

export const createPhase = (phaseName: string): IPhase => {
  const newPhase: IPhase = {
    phaseId: phasesDummy.length + 1,
    phaseName,
    status: phasesDummy.length === 0 ? PhaseStatus.UNLOCKED : PhaseStatus.LOCKED,
    isDone: false,
    tasks: [],
  };
  phasesDummy.push(newPhase);

  return newPhase;
};
