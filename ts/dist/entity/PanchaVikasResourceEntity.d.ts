import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { PanchaVikasResource, PanchaVikasResourceListMatch } from '../OpenMindfulnessTypes';
declare class PanchaVikasResourceEntity extends OpenMindfulnessEntityBase<PanchaVikasResource> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: PanchaVikasResourceEntity): PanchaVikasResourceEntity;
    list(this: any, reqmatch?: PanchaVikasResourceListMatch, ctrl?: Control): Promise<PanchaVikasResourceEntity[]>;
}
export { PanchaVikasResourceEntity };
