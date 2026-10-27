import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { Glossary, GlossaryLoadMatch, GlossaryListMatch } from '../OpenMindfulnessTypes';
declare class GlossaryEntity extends OpenMindfulnessEntityBase<Glossary> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: GlossaryEntity): GlossaryEntity;
    load(this: any, reqmatch?: GlossaryLoadMatch, ctrl?: Control): Promise<GlossaryEntity>;
    list(this: any, reqmatch?: GlossaryListMatch, ctrl?: Control): Promise<GlossaryEntity[]>;
}
export { GlossaryEntity };
