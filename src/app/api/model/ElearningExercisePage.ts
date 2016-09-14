'use strict';
import * as models from './models';

/**
 * elearning练习单篇
 */
export interface ElearningExercisePage {
    

    /**
     * 图片地址
     */
    image?: string;

    /**
     * 练习信息
     */
    exercise?: models.ElearningExercise;

    /**
     * id
     */
    id?: string;

    /**
     * 主标题
     */
    title?: string;
}
