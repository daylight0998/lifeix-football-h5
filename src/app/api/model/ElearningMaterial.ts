'use strict';
import * as models from './models';

/**
 * elearning资料下载
 */
export interface ElearningMaterial {
    

    /**
     * 资料名称
     */
    name?: string;

    /**
     * id
     */
    id?: string;

    /**
     * 资料地址
     */
    url?: string;
    type?:string;
}
