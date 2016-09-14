'use strict';
import * as models from './models';

/**
 * Like
 */
export interface Like {
    

    /**
     * 当前用户/设备/ip 是否喜欢过该target
     */
    like?: boolean;

    /**
     * 类型或者说业务系统:比如：nationalteam,post
     */
    type?: string;

    /**
     * 被踩的总数
     */
    unlikeNum?: number;

    /**
     * 目标，比如国家队成员
     */
    target?: string;

    /**
     * 被喜欢的总数
     */
    likeNum?: number;
}
