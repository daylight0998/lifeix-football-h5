'use strict';
import * as models from './models';

/**
 * elearning单篇
 */
export interface ElearningPage {
    

    /**
     * 图片地址
     */
    images?: Array<string>;

    /**
     * 副标题
     */
    subTitle?: string;

    /**
     * 视频列表
     */
    videos?: Array<models.ElearningVideo>;

    video?:models.ElearningVideo;


    /**
     * id
     */
    id?: string;

    /**
     * 文字内容
     */
    text?: string;

    /**
     * 主标题
     */
    title?: string;

    /**
     * 页面类型： 1-视频页  | 2-文章页|
     */
    type?: number;

    /**
     * 动画地址
     */
    animation?: string;
}
