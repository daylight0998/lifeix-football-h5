'use strict';
import * as models from './models';

/**
 * 赛事概要
 */
export interface CompetitionInfo {
    

    /**
     * 12强赛
     */
    name?: string;

    /**
     * 赛季起始时间
     */
    startTime?: Date;

    /**
     * id
     */
    id?: string;

    /**
     * 赛季起始时间
     */
    endTime?: Date;
}
