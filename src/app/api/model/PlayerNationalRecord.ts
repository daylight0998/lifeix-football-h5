'use strict';
import * as models from './models';

/**
 * 球员国家队记录
 */
export interface PlayerNationalRecord {
    

    /**
     * 替补上场次数
     */
    substitution?: number;

    /**
     * 上场次数
     */
    gamesplayed?: number;

    /**
     * 红牌数
     */
    dismissals?: number;

    /**
     * 首发上场次数
     */
    starts?: number;

    /**
     * 黄牌数
     */
    bookings?: number;

    /**
     * playerId
     */
    playerId?: number;

    /**
     * 进球数
     */
    goals?: number;
}
