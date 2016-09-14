'use strict';
import * as models from './models';

/**
 * 赛事队伍信息
 */
export interface CompetitionTeamInfo {
    

    /**
     * 大名单公布时间
     */
    setupDate?: Date;

    /**
     * 球队名称：参见xxx赛事的中国队
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    teamInfo?: models.TeamInfo;

    /**
     * 球队分组
     */
    group?: string;
}
