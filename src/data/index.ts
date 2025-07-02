
import { topLevelRisks } from './risks';
import { controls } from './controls';
import { others } from './others';

export const risksData = [...controls, ...others];
export const allRisksData = [...topLevelRisks, ...risksData];

export { topLevelRisks, controls, others };