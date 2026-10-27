import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { CitationDetail, CitationDetailLoadMatch, CitationDetailListMatch } from '../OpenMindfulnessTypes';
declare class CitationDetailEntity extends OpenMindfulnessEntityBase<CitationDetail> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: CitationDetailEntity): CitationDetailEntity;
    load(this: any, reqmatch?: CitationDetailLoadMatch, ctrl?: Control): Promise<CitationDetailEntity>;
    list(this: any, reqmatch?: CitationDetailListMatch, ctrl?: Control): Promise<CitationDetailEntity[]>;
}
export { CitationDetailEntity };
