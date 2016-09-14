'use strict';
import * as models from './models';

/**
 * elearning视频
 */
export interface ElearningVideo {
    

    /**
     * 答题选项列表2
     */
    r2?: Array<models.ElearningOption>;

    /**
     * 视频时长
     */
    duration?: number;

    /**
     * 视频地址
     */
    videoPath?: string;

    /**
     * 视频图片地址
     */
    imagePath?: string;

    /**
     * 视频引用足球规则
     */
    rule?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 视频解释
     */
    explanation?: string;

    /**
     * 答题选项列表1
     */
    r1?: Array<models.ElearningOption>;

    /**
     * 视频思考点
     */
    considerations?: string;

    title?:string;
}
