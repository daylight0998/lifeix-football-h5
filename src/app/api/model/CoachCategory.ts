'use strict';
import * as models from './models';

/**
 * 教练分类
 */
export interface CoachCategory {
    

    /**
     * 教练列表
     */
    coaches?: Array<models.Coach>;

    /**
     * 分类名称
     */
    categoryName?: string;
}
