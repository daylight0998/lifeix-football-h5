'use strict';
import * as models from './models';

/**
 * 裁判员
 */
export interface Referee {
    

    /**
     * 出生地  中国北京
     */
    birthday?: Date;

    /**
     * 国家： 中国
     */
    country?: string;

    /**
     * 级别
     */
    level?: string;

    /**
     * 性别
     */
    sex?: string;

    /**
     * 属于的协会
     */
    association?: string;

    /**
     * 照片
     */
    avatar?: string;

    /**
     * 国际A级比赛执法场次
     */
    fifaTopANum?: number;

    /**
     * 顶级联赛执法次数
     */
    topLeagueNum?: number;

    /**
     * 出生地  中国北京
     */
    birthplace?: string;

    /**
     * 主裁判、助理裁判
     */
    function?: string;

    /**
     * 名字：郎平
     */
    name?: string;

    /**
     * 成为国际级裁判的时间
     */
    sinceInternational?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 主裁、边裁、第四官员
     */
    position?: string;

    /**
     * 11人制，5人制，沙滩
     */
    category?: string;
}
