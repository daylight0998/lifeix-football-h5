'use strict';
import * as models from './models';

/**
 * 教练分类
 */
export interface CoachCategoryTop {
    

    /**
     * 顶级分类名称
     */
    topName?: string;

    /**
     * 下级分类
     */
    category?: Array<models.CoachCategory>;
}
