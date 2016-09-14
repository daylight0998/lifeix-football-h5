'use strict';
import * as models from './models';

/**
 * 比赛队伍信息
 */
export interface MatchTeamInfo {
    

    /**
     * 大名单公布时间
     */
    setupDate?: Date;

    /**
     * 介绍
     */
    introduce?: string;

    /**
     * id
     */
    teamId?: number;

    /**
     * id
     */
    id?: number;

    teamInfo?: models.TeamInfo;
}
