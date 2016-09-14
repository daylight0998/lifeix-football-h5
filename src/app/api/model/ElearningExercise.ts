'use strict';
import * as models from './models';

/**
 * elearning练习
 */
export interface ElearningExercise {
    

    /**
     * 训练视频地址
     */
    video1?: string;

    /**
     * 练习参与者
     */
    material?: string;

    /**
     * 比赛视频地址
     */
    video2?: string;

    /**
     * 练习描述
     */
    description?: string;

    /**
     * 练习预期目标
     */
    objectives?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 主标题
     */
    title?: string;

    /**
     * 动画地址
     */
    animation?: string;
}
