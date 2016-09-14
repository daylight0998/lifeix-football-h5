'use strict';
import * as models from './models';

/**
 * 队员国家队比赛记录
 */
export interface PlayerNationalMatch {
    

    hostTeam?: models.TeamInfo;

    /**
     * 黄牌数
     */
    booking?: number;

    /**
     * 进球数
     */
    goal?: number;

    /**
     * 主队进球
     */
    hostScore?: number;

    /**
     * 红牌数
     */
    dismissal?: number;

    awayTeam?: models.TeamInfo;

    /**
     * 客队进球
     */
    awayScore?: number;

    /**
     * 上场时间
     */
    showTime?: number;

    competition?: models.CompetitionInfo;

    /**
     * id
     */
    id?: number;

    /**
     * 是否首发 0：为首发 1：首发
     */
    first?: number;

    /**
     * playerId
     */
    playerId?: number;
}
