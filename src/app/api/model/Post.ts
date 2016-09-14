'use strict';
import * as models from './models';

/**
 * 帖子
 */
export interface Post {
    

    /**
     * 图片地址
     */
    images?: Array<string>;

    /**
     * 文章类别ID
     */
    categoryIds?: Array<string>;

    /**
     * post创建日期
     */
    createTime?: Date;

    author?: models.Author;

    /**
     * 视频地址
     */
    videos?: Array<models.Video>;

    /**
     * id
     */
    id?: string;

    /**
     * 标题，5-50个字符
     */
    title?: string;

    /**
     * 内容，可以是纯文本或者html形式，最长字符5000
     */
    content?: string;

    /**
     * 状态 ：1可用 ，0不可用
     */
    status?: number;
}
