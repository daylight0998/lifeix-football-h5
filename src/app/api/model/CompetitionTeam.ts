'use strict';
import * as models from './models';

/**
 * 赛事队伍信息
 */
export interface CompetitionTeam {
    

    doctor?: models.Staff;

    /**
     * 大名单公布时间
     */
    setupDate?: Date;

    chiefCoach?: models.Coach;

    competitionInfo?: models.CompetitionInfo;

    /**
     * 球员
     */
    players?: Array<models.PlayerInfo>;

    /**
     * 球队名称：参见xxx赛事的中国队
     */
    name?: string;

    /**
     * 助理教练
     */
    assistantCoach?: Array<models.Coach>;

    staffs?:Array<models.Staff>;

    /**
     * id
     */
    id?: string;

    teamLeader?: models.Staff;

    teamInfo?: models.TeamInfo;
}
