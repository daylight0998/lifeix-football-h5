'use strict';
import * as models from './models';

/**
 * elearning培训类目
 */
export interface ElearningTrainingCategory {
    

    /**
     * 类目图片地址
     */
    image?: string;

    /**
     * 类目下的单篇总数量
     */
    pageCount?: number;

    /**
     * 子类目
     */
    cats?: Array<models.ElearningTrainingCategory>;

    /**
     * 类目名称
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 类目对应的页面类型：1-视频列表  | 2-文章列表 | 3-测试
     */
    type?: number;

    /**
     * 父目录Id
     */
    parentId?: string;
}
