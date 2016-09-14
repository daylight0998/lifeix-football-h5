'use strict';
import * as models from './models';

/**
 * 队员
 */
export interface Player {
    

    /**
     * 出生地  中国北京
     */
    birthday?: Date;

    /**
     * 所属球队：国家队
     */
    teamName?: string;

    /**
     * 国家： 中国
     */
    country?: string;

    /**
     * 职业生涯
     */
    career?: Array<models.TeamInfo>;

    /**
     * 用户喜欢的对象集合
     */
    competitions?: Array<models.CompetitionInfo>;

    /**
     * 体重
     */
    weight?: string;

    /**
     * 头像地址
     */
    avatar?: string;

    /**
     * 参加过的国家队比赛
     */
    matches?: Array<models.PlayerNationalMatch>;

    /**
     * 国家队入选次数
     */
    selectedNum?: string;

    /**
     * 出生地  中国北京
     */
    birthplace?: string;

    /**
     * 所属球队：球队id
     */
    teamId?: string;

    record?: models.PlayerNationalRecord;

    nationTeam?: models.TeamInfo;

    /**
     * 名字：李铁
     */
    name?: string;

    club?: models.TeamInfo;

    /**
     * id
     */
    id?: string;

    /**
     * 位置：前锋
     */
    position?: string;

    /**
     * 身高
     */
    height?: string;
}
