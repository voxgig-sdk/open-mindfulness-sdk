import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { Category, CategoryLoadMatch } from '../OpenMindfulnessTypes';
declare class CategoryEntity extends OpenMindfulnessEntityBase<Category> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: CategoryEntity): CategoryEntity;
    load(this: any, reqmatch?: CategoryLoadMatch, ctrl?: Control): Promise<CategoryEntity>;
}
export { CategoryEntity };
