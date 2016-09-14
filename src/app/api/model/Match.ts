'use strict';
import * as models from './models';

/**
 * 比赛
 */
export interface Match {
    

    chiefReferee?: models.Referee;

    /**
     * 主队进球数
     */
    hostScore?: number;

    awayTeam?: models.MatchTeam;

    bsjd?: models.MatchStaff;

    competitionInfo?: models.CompetitionInfo;

    /**
     * 比赛介绍，如历史战绩等
     */
    introduce?: string;

    cpjd?: models.MatchStaff;

    court?: models.Court;

    hostTeam?: models.MatchTeam;

    fourthReferee?: models.Referee;

    /**
     * 客队进球数
     */
    awayScore?: number;

    /**
     * 边裁
     */
    sideReferees?: Array<models.Referee>;

    /**
     * 比赛开始时间
     */
    startTime?: Date;

    startDate?: Date;

    /**
     * id
     */
    id?: number;

    /**
     * 比赛开始地点
     */
    position?: Date;

    /**
     * 比赛状态 0：未开始，1：已结束
     */
    state?: number;
    /**分组 */
    group?: string;

    stage?: string;

}
