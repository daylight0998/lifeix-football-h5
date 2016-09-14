'use strict';
import * as models from './models';

/**
 * 裁判分类
 */
export interface RefereeCategoryTop {
    

    /**
     * 顶级分类名称
     */
    topName?: string;

    /**
     * 下级分类
     */
    category?: Array<models.RefereeCategory>;
}
