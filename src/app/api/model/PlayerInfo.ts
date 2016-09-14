'use strict';
import * as models from './models';

/**
 * 队员
 */
export interface PlayerInfo {
    

    /**
     * 出生地  中国北京
     */
    birthday?: Date;

    /**
     * 国籍
     */
    country?: string;

    /**
     * 出生地  中国北京
     */
    birthplace?: string;

    record?: models.PlayerNationalRecord;

    /**
     * 名字：李铁
     */
    name?: string;

    /**
     * 体重
     */
    weight?: string;

    /**
     * id
     */
    id?: number;

    /**
     * 头像地址
     */
    avatar?: string;

    /**
     * 位置：前锋
     */
    position?: string;

    /**
     * 球衣号码
     */
    jeserysNum?: number;

    /**
     * 1:首发 2：替补
     */
    first?: number;

    /**
     * 身高
     */
    height?: string;
}
