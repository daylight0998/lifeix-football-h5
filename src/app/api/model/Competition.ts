'use strict';
import * as models from './models';

/**
 * 赛事：比如12强赛
 */
export interface Competition {
    

    /**
     * 参赛队伍
     */
    teams?: Array<models.Team>;

    /**
     * 赛季起始时间
     */
    endDate?: Date;

    /**
     * 12强赛
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    competitionCategory?: models.CompetitionCategory;

    /**
     * 比赛
     */
    matches?: Array<models.Match>;

    /**
     * 赛季起始时间
     */
    startDate?: Date;
}
