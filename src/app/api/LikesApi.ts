import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import {BaseApi} from './baseApi';
import * as models from './model/models';

'use strict';
@Injectable()
export class LikesApi extends BaseApi{

    constructor(protected http: Http, @Optional() basePath: string) {
        super(http,basePath);
    }
    /**
     * 对某一个目标点赞
     * 一个Ip地址只能对一个目标点赞/踩一次，第二次仍会返回正确，但是数目不会变化
     * @param type target的类型，如果是国家队成员则写nationalteam，如果是文章则填入post
     * @param target 目标：比如可以nationteam的memberid，也可以是post的id
     * @param like ture 点赞，false 踩
     */
    public addLike (type: string, target: string, like?: boolean) : Observable<models.Like> {
        const path =  '/like/likes';
        let formParams = new URLSearchParams();
        if (!type) {
            throw new Error('Missing required parameter type when calling addLike');
        }
        if (!target) {
            throw new Error('Missing required parameter target when calling addLike');
        }
        formParams.set("type",type);
        formParams.set("target",target);
        formParams.set("like",String(like));
        return this.postAPI(path, formParams.toString()).map((response: Response) => response.json());
    }

    /**
     * 获得某一个Post的点赞信息
     * 比如：立方体育XX like 100 unlike20 like true
     * @param target 目标：比如可以nationteam的memberid，也可以是post的id
     * @param type target的类型，如果是国家队成员则写nationalteam，如果是文章则填入post
     */
    public getTagetLikeds (target: string, type: string) : Observable<models.Like> {
        const path =  '/like/likes/{target}'
            .replace('{' + 'target' + '}', String(target));

       let queryParameters = new URLSearchParams();
        if (!target) {
            throw new Error('Missing required parameter target when calling getPostLikeds');
        }
        if (!type) {
            throw new Error('Missing required parameter type when calling getPostLikeds');
        }
        queryParameters.set("type",type);
        return this.getAPI(path+"?"+queryParameters)
            .map((response: Response) => response.json());
    }
    /**
     * 获得国家队成员的喜欢列表，包含教练coach，领队leader，球员player
     * @param key key
     */
    public getTeamLikes (group:string) : Observable<Array<models.Like>> {
        const path =  '/like/likes';
        if (!group) {
            throw new Error('Missing required parameter target when calling getPostLikeds');
        }
        let queryParameters = new URLSearchParams();
        queryParameters.set("group",group);
        return this.getAPI(path+"?"+queryParameters).map((response: Response) => response.json());
    }

}
