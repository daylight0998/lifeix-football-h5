'use strict';
import * as models from './models';

/**
 * 赛事分组
 */
export interface CompetitionGroup {
    

    /**
     * 赛事id
     */
    competitionId?: number;

    /**
     * 分组名称
     */
    groupName?: string;

    /**
     * 降级个数
     */
    bottomRank?: number;

    /**
     * 小组球队
     */
    teams?: Array<models.CompetitionTeamPts>;

    /**
     * id
     */
    id?: number;

    /**
     * 晋级个数
     */
    topRank?: number;
}
