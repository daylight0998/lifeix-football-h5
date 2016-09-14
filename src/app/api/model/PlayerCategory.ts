'use strict';
import * as models from './models';

/**
 * 球员分类
 */
export interface PlayerCategory {
    

    /**
     * 球员列表
     */
    players?: Array<models.PlayerInfo>;

    /**
     * 分类名称
     */
    categoryName?: string;

    nationalLevel?:number;
}
