'use strict';
import * as models from './models';

/**
 * 队伍信息
 */
export interface TeamInfo {
    

    /**
     * 队旗
     */
    flag?: string;

    teamCategory?: models.TeamCategory;

    /**
     * 球队名称：山东鲁能队
     */
    name?: string;

    jerseys?: models.Jerseys;

    /**
     * id
     */
    id?: string;

    /**
     * 教练或者职员引用teamInfo时有数据,此人在球队中的位置
     */
    position?: string;
}
