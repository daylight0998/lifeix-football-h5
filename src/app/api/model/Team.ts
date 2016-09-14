'use strict';
import * as models from './models';

/**
 * 队伍信息
 */
export interface Team {
    

    doctor?: models.Staff;

    chiefCoach?: models.Coach;

    /**
     * 队旗
     */
    flag?: string;

    /**
     * 球员
     */
    players?: Array<models.Player>;

    teamCategory?: models.TeamCategory;

    /**
     * 球队名称：中国队
     */
    name?: string;

    /**
     * 助理教练
     */
    assistantCoach?: Array<models.Coach>;

    jerseys?: models.Jerseys;

    /**
     * id
     */
    id?: string;

    teamLeader?: models.Staff;

    group?:string;
}
