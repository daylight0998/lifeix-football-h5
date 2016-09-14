'use strict';
import * as models from './models';

/**
 * 比赛队伍信息
 */
export interface MatchTeam {
    

    doctor?: models.Staff;

    /**
     * 大名单公布时间
     */
    setupDate?: Date;

    chiefCoach?: models.Coach;

    /**
     * 介绍
     */
    introduce?: string;

    competitionInfo?: models.CompetitionInfo;

    /**
     * 球员
     */
    substitutionPlayers?: Array<models.PlayerInfo>;

    /**
     * 助理教练
     */
    assistantCoach?: Array<models.Coach>;

    /**
     * id
     */
    id?: number;

    teamLeader?: models.Staff;

    teamInfo?: models.TeamInfo;

    competitionTeamInfo?: models.CompetitionTeamInfo;

    /**
     * 球员
     */
    firstPlayers?: Array<models.PlayerInfo>;
}
