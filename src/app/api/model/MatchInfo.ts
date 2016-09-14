'use strict';
import * as models from './models';

/**
 * 比赛信息
 */
export interface MatchInfo {
    

    /**
     * 主队进球数
     */
    hostScore?: number;

    awayTeam?: models.MatchTeamInfo;

    competitionInfo?: models.CompetitionInfo;

    /**
     * 比赛介绍，如历史战绩等
     */
    introduce?: string;

    court?: models.Court;

    hostTeam?: models.MatchTeamInfo;

    /**
     * 比赛阶段
     */
    stage?: number;

    /**
     * 客队进球数
     */
    awayScore?: number;

    /**
     * 比赛时间
     */
    startTime?: Date;

    /**
     * id
     */
    id?: number;

    /**
     * 比赛开始地点
     */
    position?: string;

    /**
     * 比赛状态
     */
    state?: number;

    /**
     * 比赛日期
     */
    startDate?: Date;

    /**
     * 赛事分组
     */
    group?: string;
}
