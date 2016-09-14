import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {BaseApi} from './baseApi';
import * as models from './model/models';

'use strict';
@Injectable()
export class PostApi extends BaseApi{

    public defaultHeaders: Headers = new Headers();

    constructor(protected http: Http, @Optional() basePath: string) {
        super(http,basePath);
       
    }
    /**
     * 获取整个类目
     * 将数据库（缓存）中所有类目都返回
     */
    public getTopNews(catIds: string, limit: number): Observable<Array<models.Post>> {
        const path = '/wemedia/tops';
        let queryParameters = new URLSearchParams();
        if (!catIds) {
            throw new Error('catId is null');
        }
        if(!limit) {
            limit = 9;
        }
        queryParameters.set("categoryIds", catIds);
        queryParameters.set("limit", limit.toString());
        return this.getAPI(path+"?"+queryParameters).map((response: Response) => response.json());
    }

    public searchNews(catId:string,date:string,limit:number):Observable<Array<models.Post>>{
        const path = '/wemedia/posts/search';
        let queryParameters = new URLSearchParams();
        if (!catId) {
            throw new Error('catId is null');
        }
        if (!limit) {
            limit = 9;
        }
        queryParameters.set("categoryId", catId);
        queryParameters.set("limit", limit.toString());
        if(date) {
           queryParameters.set("date",date);
        }
        return this.getAPI(path + "?" + queryParameters).map((response: Response) => response.json());
    }

   /**
    * 根据Id获取Post详情
    * 返回Post详情对象
    * @param key key
    * @param postId Post的ID
    */
    public getPostDetail(postId: string): Observable<models.Post> {
        const path = '/wemedia/posts/{postId}'
            .replace('{' + 'postId' + '}', String(postId));
        if (!postId) {
            throw new Error('Missing required parameter postId when calling getPostDetail');
        }
        return this.getAPI(path).map((response: Response) => response.json());
    }

    public getPostQR(link:string){
        const path ='/like/qr';
        let queryParameters = new URLSearchParams();
        if (!link) {
            throw new Error('link is null');
        }
        queryParameters.set("link",link);
        return this.getAPI(path+"?"+queryParameters);
    }

}
