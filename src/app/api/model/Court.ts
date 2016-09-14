'use strict';
import * as models from './models';

/**
 * 球场
 */
export interface Court {
    

    /**
     * 球场照片
     */
    images?: string;

    /**
     * 名字：鲁能大球场
     */
    name?: string;

    /**
     * id
     */
    id?: number;

    /**
     * 位置，例如：济南
     */
    position?: string;

    /**
     * 球场容量
     */
    capacity?: number;
}
