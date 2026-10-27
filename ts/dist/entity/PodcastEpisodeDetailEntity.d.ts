import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { PodcastEpisodeDetail, PodcastEpisodeDetailLoadMatch, PodcastEpisodeDetailListMatch } from '../OpenMindfulnessTypes';
declare class PodcastEpisodeDetailEntity extends OpenMindfulnessEntityBase<PodcastEpisodeDetail> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: PodcastEpisodeDetailEntity): PodcastEpisodeDetailEntity;
    load(this: any, reqmatch?: PodcastEpisodeDetailLoadMatch, ctrl?: Control): Promise<PodcastEpisodeDetailEntity>;
    list(this: any, reqmatch?: PodcastEpisodeDetailListMatch, ctrl?: Control): Promise<PodcastEpisodeDetailEntity[]>;
}
export { PodcastEpisodeDetailEntity };
