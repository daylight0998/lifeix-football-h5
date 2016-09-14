'use strict';
import * as models from './models';

/**
 * 教练
 */
export interface Coach {
    

    /**
     * 出生地  中国北京
     */
    birthday?: Date;

    /**
     * 国家： 中国
     */
    country?: string;

    /**
     * 职业生涯
     */
    career?: Array<models.TeamInfo>;

    /**
     * 出生地  中国北京
     */
    birthplace?: string;

    /**
     * 裁判级别
     */
    level?: string;

    /**
     * 介绍
     */
    introduce?: string;

    /**
     * 名字：高洪波
     */
    name?: string;

    /**
     * id
     */
    id?: number;

    /**
     * 照片
     */
    avatar?: string;

    /**
     * 职位：主教练,助理教练
     */
    position?: string;

    team?: models.TeamInfo;
}
