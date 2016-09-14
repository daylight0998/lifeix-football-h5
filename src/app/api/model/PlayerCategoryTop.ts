'use strict';
import * as models from './models';

/**
 * 球员分类
 */
export interface PlayerCategoryTop {
    

    /**
     * 顶级分类名称
     */
    topName?: string;

    /**
     * 下级分类
     */
    category?: Array<models.PlayerCategory>;
}
