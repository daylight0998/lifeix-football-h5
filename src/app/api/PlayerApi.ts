import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as models from './model/models';
import 'rxjs/Rx';
import {BaseApi} from './baseApi';
'use strict';

@Injectable()
export class PlayerApi extends BaseApi{
   
    constructor(protected http: Http, @Optional() basePath: string) {
        super(http, basePath);

    }
    /**
     * 查看国家队下的所有球员
     */
    public getNationalPlayer(): Observable<Array<models.PlayerCategoryTop>> {
        const path =  '/games/players/national';    
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 查看国家队下的所有教练
     */
    public getNationalCoach () : Observable<Array<models.CoachCategoryTop>> {
        const path = '/games/coaches/national';
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
     /**
     * 查看教练详情
     * @param coachId 教练Id
     */
    public getCoach (coachId: number) : Observable<models.Coach> {
        const path =  '/games/coaches/{coachId}'
            .replace('{' + 'coachId' + '}', String(coachId));
        if (!coachId) {
            throw new Error('Missing required parameter coachId when calling getCoach');
        }
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }

    /**
   * 获得裁判列表
   * @param level 裁判级别
   * @param startId 开始查询的id
   * @param pageSize 一页显示多少
   */
    public getReferees(level: string): Observable<Array<models.RefereeCategoryTop>> {
        const path = '/games/referees';

        let queryParameters = new URLSearchParams();
        if (!level) {
            throw new Error('Missing required parameter level when calling getReferees');
        }
        if (level !== undefined) {
            queryParameters.set('level', level);
        }
        return this.getAPI(path+"?"+queryParameters)
            .map((response: Response) => response.json());
    }

    /**
     * 查看球员信息
     * @param playerId 球员Id
     */
    public getPlayer (playerId: number,level:number) : Observable<models.Player> {
        let path = '/games/players/{playerId}'
            .replace('{' + 'playerId' + '}', String(playerId));
        if (!playerId) {
            throw new Error('Missing required parameter playerId when calling getPlayer');
        }
        if(level) {
            path = path+"?nationalLevel="+level;
        }
        return this.getAPI(path).map((response: Response) => response.json());
    }
    /**
     * 查看职员信息
     * @param staffId 员工的Id
     */
    public getStaff (staffId: number) : Observable<models.Staff> {
        const path =  '/games/staffs/{staffId}'
            .replace('{' + 'staffId' + '}', String(staffId));

        if (!staffId) {
            throw new Error('Missing required parameter staffId when calling getStaff');
        }
       return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 获得裁判联赛级别
     */
    public getRefereeLeagueCategory () : Observable<Array<string>> {
        const path =  '/games/referees/leagueCategory';

        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 根据联赛级别获得裁判列表
     * @param league 裁判联赛级别
     */
    public getRefereesByLeague ( league: string) : Observable<Array<models.RefereeCategory>> {
        const path =  '/games/referees/league';
        if (!league) {
            throw new Error('Missing required parameter league when calling getRefereesByLeague');
        }
         let queryParameters = new URLSearchParams();
         queryParameters.set("league",league);
        return this.getAPI(path+"?"+queryParameters)
            .map((response: Response) => response.json());
    }

}
