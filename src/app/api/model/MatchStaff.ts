'use strict';
import * as models from './models';

/**
 * 比赛工作人员
 */
export interface MatchStaff {
    

    /**
     * 出生地  中国北京
     */
    birthday?: Date;

    /**
     * 国家： 中国
     */
    country?: string;

    /**
     * 出生地  中国北京
     */
    birthplace?: string;

    /**
     * 介绍
     */
    introduce?: string;

    /**
     * 名字
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 照片
     */
    avatar?: string;

    /**
     * 职位：领队,队医....
     */
    position?: string;
}
