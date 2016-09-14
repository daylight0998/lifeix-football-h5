'use strict';
import * as models from './models';

/**
 * 球队分类
 */
export interface TeamCategory {
    

    /**
     * 父目录Id
     */
    fId?: string;

    /**
     * 类目名称
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 子类目
     */
    categories?: Array<models.TeamCategory>;

    /**
     * 是否是叶子节点
     */
    isLeaf?: number;
}
