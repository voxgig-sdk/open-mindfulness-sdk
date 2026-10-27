import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { Practice, PracticeLoadMatch, PracticeListMatch } from '../OpenMindfulnessTypes';
declare class PracticeEntity extends OpenMindfulnessEntityBase<Practice> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: PracticeEntity): PracticeEntity;
    load(this: any, reqmatch?: PracticeLoadMatch, ctrl?: Control): Promise<PracticeEntity>;
    list(this: any, reqmatch?: PracticeListMatch, ctrl?: Control): Promise<PracticeEntity[]>;
}
export { PracticeEntity };
