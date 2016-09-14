/**
 * Lifeix Designer API
 * 此API用于Lifeix Football Wemedia
 *
 * OpenAPI spec version: 1.0.0
 * Contact: chaochaog@l99.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
import * as models from './models';

/**
 * 赛事分组
 */
export interface CompetitionTeamPts {
    

    /**
     * 获胜场次
     */
    winNum?: number;

    /**
     * 赛事id
     */
    competitionId?: number;

    /**
     * 赛事小组id
     */
    groupId?: number;

    /**
     * 平局场次
     */
    drawNum?: number;

    /**
     * 赛事球队id
     */
    competitionTeamId?: number;

    teamInfo?: models.TeamInfo;

    /**
     * 积分
     */
    pts?: number;

    /**
     * 分组名称
     */
    groupName?: string;

    /**
     * 比赛场次
     */
    matchNum?: number;

    /**
     * 球队id
     */
    teamId?: number;

    /**
     * 失败场次
     */
    lostNum?: number;

    /**
     * 失球数
     */
    ga?: number;

    /**
     * id
     */
    id?: number;

    /**
     * 进球数
     */
    gf?: number;
}
