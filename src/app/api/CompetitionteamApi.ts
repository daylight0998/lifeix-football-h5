import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {BaseApi} from './baseApi';
import * as models from './model/models';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';

@Injectable()
export class CompetitionteamApi extends BaseApi {

    constructor(protected http: Http, @Optional() basePath: string) {
        super(http, basePath);
    }

    /**
     * 获得参赛球队的详细信息,包括教练、球员、工作人员信息
     * 获得球队信息
     * @param competitionId 赛事的Id
     * @param teamId 队伍Id
     */
    public findCompetitionTeam(competitionId: number, teamId: number): Observable<models.CompetitionTeam> {
        const path = '/games/competitions/{competitionId}/teams/{teamId}/competitionTeam'
            .replace('{' + 'competitionId' + '}', String(competitionId))
            .replace('{' + 'teamId' + '}', String(teamId));
        if (!competitionId) {
            throw new Error('Missing required parameter competitionId when calling findCompetitionTeam');
        }
        if (!teamId) {
            throw new Error('Missing required parameter teamId when calling findCompetitionTeam');
        }

        return this.getAPI(path).map((response: Response) => response.json());
    }

     /**
     * 查看赛事积分榜
     * @param competitionId 赛事的Id
     */
    public getCompetitionGroup (competitionId: number) : Observable<Array<models.CompetitionGroup>> {
        const path = '/games/competitions/{competitionId}/group'
            .replace('{' + 'competitionId' + '}', String(competitionId));
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (competitionId === null || competitionId === undefined) {
            throw new Error('Required parameter competitionId was null or undefined when calling getCompetitionGroup.');
        }
        return this.getAPI(path).map((response: Response) => {
            if (response.status === 204) {
                return undefined;
            } else {
                return response.json();
            }
        });
    }

}
