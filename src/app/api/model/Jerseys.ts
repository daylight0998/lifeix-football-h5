'use strict';
import * as models from './models';

/**
 * 球衣
 */
export interface Jerseys {
    

    /**
     * 球衣图片
     */
    image?: string;

    /**
     * 球衣停止使用时间
     */
    endDate?: Date;

    /**
     * 球衣创意介绍
     */
    introduce?: string;

    /**
     * 球队id
     */
    teamId?: string;

    /**
     * 袜子
     */
    socks?: string;

    /**
     * 上衣
     */
    jacket?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 球裤
     */
    shorts?: string;

    /**
     * 球衣开始使用时间
     */
    startDate?: Date;
}
