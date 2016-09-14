import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {BaseApi} from './baseApi';
import * as models from './model/models';

'use strict';
@Injectable()
export class MatchersApi extends BaseApi{
    constructor(protected http: Http, @Optional() basePath: string) {
        super(http,basePath);
       
    }
    /**
     * 获取时间轴
     */
    public findTimeLineMatchs(competitionId: number, teamId: number): Observable<Array<models.MatchInfo>> {
       
        let queryParameters = new URLSearchParams();
        if (!competitionId) {
            throw new Error('Missing required parameter competitionId when calling findByCompetitionIdAndTeamId');
        }
        if (!teamId) {
            throw new Error('Missing required parameter teamId when calling findByCompetitionIdAndTeamId');
        }
        if (teamId !== undefined) {
            queryParameters.set('teamId', String(teamId));
        }
        const path = '/games/competitions/{competitionId}/matches'
            .replace('{' + 'competitionId' + '}', String(competitionId))+"?"+queryParameters;

        return this.getAPI(path).map((response: Response) => {
            if (response.status === 204) {
                return undefined;
            } else {
                return response.json();
            }
        });
    }

    /**
     * 获取赛事分类列表
     * @param teamType 0：国家队 类别 1：职业俱乐部 类别 2：业余俱乐部 4：校园足球队 5：其他
     */
    public getCompetitionCategories(categoryId:string): Observable<models.Competition> {
        const path = '/games/competitionCategory/{categoryId}/lastestCompetition'
            .replace('{' + 'categoryId' + '}', categoryId) 
        
        return this.getAPI(path).map((response: Response) => response.json());
    }
    /**
     * 获得比赛信息
     * @param competitionId 赛事的Id
     * @param matchId 比赛Id
     */
    public getMatch (competitionId: number, matchId: number) : Observable<models.Match> {
        const path = '/games/competitions/{competitionId}/matches/{matchId}'
            .replace('{' + 'competitionId' + '}', String(competitionId))
            .replace('{' + 'matchId' + '}', String(matchId));
        if (!competitionId) {
            throw new Error('Missing required parameter competitionId when calling getMatch');
        }
        if (!matchId) {
            throw new Error('Missing required parameter matchId when calling getMatch');
        }
        return this.getAPI(path).map((response: Response) =>{
            if (response.status === 204) {
                return undefined;
            } else {
                return response.json();
            }
        });
    }
    
    /**
     * 获取赛事直播信息
     * @param competitionId 赛事的Id
     */
    public findCurrentMatchZhibo (competitionId: number) : Observable<models.InlineResponse200> {
        const path =  '/games/competitions/{competitionId}/matches/zhibo/current'
            .replace('{' + 'competitionId' + '}', String(competitionId));
        if (competitionId === null || competitionId === undefined) {
            throw new Error('Required parameter competitionId was null or undefined when calling findCurrentMatchZhibo.');
        }
        return this.getAPI(path).map((response: Response) => {
            if (response.status === 204||!response.text()) {
                return undefined;
            } else {
                return response.json();
            }
        });
    }

    public getMatchZhibo (competitionId: number, matchId: number) : Observable<models.MatchZhiBo> {
        const path = '/games/competitions/{competitionId}/matches/{matchId}/zhibo'
            .replace('{' + 'competitionId' + '}', String(competitionId))
            .replace('{' + 'matchId' + '}', String(matchId));
        if (!competitionId) {
            throw new Error('Missing required parameter competitionId when calling getMatch');
        }
        if (!matchId) {
            throw new Error('Missing required parameter matchId when calling getMatch');
        }
        return this.getAPI(path).map((response: Response) =>{
            if (response.status === 204) {
                return undefined;
            } else {
                return response.json();
            }
        });
    }

}
