import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { Blog, BlogLoadMatch, BlogListMatch } from '../OpenMindfulnessTypes';
declare class BlogEntity extends OpenMindfulnessEntityBase<Blog> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: BlogEntity): BlogEntity;
    load(this: any, reqmatch?: BlogLoadMatch, ctrl?: Control): Promise<BlogEntity>;
    list(this: any, reqmatch?: BlogListMatch, ctrl?: Control): Promise<BlogEntity[]>;
}
export { BlogEntity };
