'use strict';
import * as models from './models';

/**
 * 赛事类目
 */
export interface CompetitionCategory {
    

    /**
     * 赛事类目名称
     */
    name?: string;

    /**
     * 赛事规则
     */
    rule?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 赛事类目图标地址
     */
    iconUrl?: string;

    /**
     * 赛事类型 类别 0：双循环比赛  1：淘汰赛  2：小组赛+主客场淘汰赛  3：小组赛+单场淘汰赛  4：小组赛+单场淘汰赛+主客场淘汰赛 
     */
    type?: string;
}
