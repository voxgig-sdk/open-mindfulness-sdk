import { OpenMindfulnessEntityBase } from '../OpenMindfulnessEntityBase';
import type { OpenMindfulnessSDK } from '../OpenMindfulnessSDK';
import type { Control } from '../types';
import type { GameDetail, GameDetailLoadMatch, GameDetailListMatch } from '../OpenMindfulnessTypes';
declare class GameDetailEntity extends OpenMindfulnessEntityBase<GameDetail> {
    constructor(client: OpenMindfulnessSDK, entopts: any);
    make(this: GameDetailEntity): GameDetailEntity;
    load(this: any, reqmatch?: GameDetailLoadMatch, ctrl?: Control): Promise<GameDetailEntity>;
    list(this: any, reqmatch?: GameDetailListMatch, ctrl?: Control): Promise<GameDetailEntity[]>;
}
export { GameDetailEntity };
