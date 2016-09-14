'use strict';
import * as models from './models';

/**
 * 视频
 */
export interface Video {
    

    /**
     * 预览图片
     */
    preview?: string;

    /**
     * 视频时常
     */
    time?: number;

    /**
     * 视频访问地址
     */
    url?: string;
}
