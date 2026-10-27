import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { Resource, ResourceListMatch } from '../OpenMindfulnessTypes';
declare class ResourceEntity extends OpenMindfulnessEntityBase<Resource> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: ResourceEntity): ResourceEntity;
    list(this: any, reqmatch?: ResourceListMatch, ctrl?: Control): Promise<ResourceEntity[]>;
}
export { ResourceEntity };
