'use strict';
import * as models from './models';

/**
 * elearning视频答案选项
 */
export interface ElearningOption {
    

    /**
     * 答案图片项
     */
    image?: string;

    /**
     * 答案文字项
     */
    text?: string;

    /**
     * 是否是正确答案，true正确，null或false错误
     */
    right?: boolean;
}
