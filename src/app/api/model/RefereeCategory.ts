'use strict';
import * as models from './models';

/**
 * 裁判分类
 */
export interface RefereeCategory {
    

    /**
     * 分类名称
     */
    categoryName?: string;

    /**
     * 裁判列表
     */
    referees?: Array<models.Referee>;
}
