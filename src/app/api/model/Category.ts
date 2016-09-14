'use strict';
import * as models from './models';

/**
 * 类目
 */
export interface Category {
    

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

    page?: string;

    /**
     * 类目图标地址
     */
    iconUrl?: string;

    color?:string;

    /**
     * 子类目
     */
    categories?: Array<models.Category>;
}
