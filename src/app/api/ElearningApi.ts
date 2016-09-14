import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {BaseApi} from './baseApi';
import * as models from './model/models';

'use strict';
@Injectable()
export class ElearningApi extends BaseApi{


    constructor(protected http: Http, @Optional() basePath: string) {
        super(http,basePath);
       
    }
    /**
     * 获取elearning培训类目
     */
    public getElearningTrainingCategories(): Observable<Array<models.ElearningTrainingCategory>> {
        const path = '/elearning/training_categories';
        return this.getAPI(path).map((response: Response) => response.json());
    }
    /**
     * 获取elearning测试类目
     */
    public getElearningQuizCategories(extraHttpRequestParams?: any): Observable<Array<models.ElearningQuizCategory>> {
        const path = '/elearning/quiz_categories';
        return this.getAPI(path).map((response: Response) => response.json());
    }
    /**
      * 获取elearning测试类目下的单级子分类列表
      * @param categoryId elearning测试类目Id
      */
    public getElearningQuizSubCategories(categoryId: string, extraHttpRequestParams?: any): Observable<Array<models.ElearningQuizCategory>> {
        const path = '/elearning/quiz_categories/{categoryId}/subCats'
            .replace('{' + 'categoryId' + '}', String(categoryId));
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningQuizSubCategories');
        }
       return this.getAPI(path)
            .map((response: Response) => response.json());
    }
   /**
    * 获取elearning培训类目下的单级子分类列表
    * @param categoryId elearning培训类目Id
    */
    public getElearningTrainingSubCategories(categoryId: string): Observable<Array<models.ElearningTrainingCategory>> {
        const path = '/elearning/training_categories/{categoryId}/subCats'
            .replace('{' + 'categoryId' + '}', String(categoryId));
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningTrainingSubCategories');
        }
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 随机获取测试分类下的单篇列表
     * @param categoryId elearning测试类目Id
     */
    public getElearningQuizPageList(categoryId: string): Observable<Array<models.ElearningPage>> {
      const path ='/elearning/quiz_categories/{categoryId}/video_pages'
        .replace('{' + 'categoryId' + '}', String(categoryId));
      if (!categoryId) {
        throw new Error('Missing required parameter categoryId when calling getElearningQuizPageList');
      }
      return this.getAPI(path)
        .map((response: Response) => response.json());
    }
    /**
     * 分页获取培训分类下的单篇列表
     * @param categoryId elearning培训类目Id
     * @param start 跳过的单篇数量，不传返回第一页
     * @param limit 每页显示的单篇数量，默认值20
     */
    public getElearningTrainingPageList(categoryId: string, start?: number, limit?: number): Observable<Array<models.ElearningPage>> {
        const path =  '/elearning/training_categories/{categoryId}/video_pages'.replace('{' + 'categoryId' + '}', String(categoryId));
        let queryParameters = new URLSearchParams();
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningTrainingPageList');
        }
        if (start !== undefined) {
            queryParameters.set('start', String(start));
        }
        if (limit !== undefined) {
            queryParameters.set('limit', String(limit));
        }
        return this.getAPI(path +'?'+ queryParameters)
            .map((response: Response) => response.json());
    }
    /**
     * 分页获取培训分类下的单篇列表
     * @param categoryId elearning培训类目Id
     * @param start 跳过的单篇数量，不传返回第一页
     * @param limit 每页显示的单篇数量，默认值20
     */
    public getElearningTrainingArticlePageList(categoryId: string, start?: number, limit?: number): Observable<Array<models.ElearningPage>> {
        const path =  '/elearning/training_categories/{categoryId}/article_pages'.replace('{' + 'categoryId' + '}', String(categoryId));
        let queryParameters = new URLSearchParams();
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningTrainingPageList');
        }
        if (start !== undefined) {
            queryParameters.set('start', String(start));
        }
        if (limit !== undefined) {
            queryParameters.set('limit', String(limit));
        }
        return this.getAPI(path +'?'+ queryParameters)
            .map((response: Response) => response.json());
    }

    public getElearningTrainingPageNext(categoryId: string, index?: number): Observable<models.ElearningPage> {
        const path =  '/elearning/training_categories/{categoryId}/video_pages/{index}'
            .replace('{' + 'categoryId' + '}', String(categoryId)).replace('{' + 'index' + '}', String(index));
        let queryParameters = new URLSearchParams();
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningTrainingPageList');
        }
        if (!index) {
            throw new Error('Missing required parameter index when calling getElearningTrainingPageList');
        }
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
   /**
    * 获取单个视频详细信息
    * 获取单个视频详细信息
    * @param videoId elearning视频的ID
    */
    public getElearningVideoDetail(videoId: string): Observable<models.ElearningVideo> {
        const path =  '/elearning/videos/{videoId}'.replace('{' + 'videoId' + '}', String(videoId));
        if (!videoId) {
            throw new Error('Missing required parameter videoId when calling getElearningVideoDetail');
        }
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 获取elearning资料下载列表
     * @param start 跳过的资料数量，不传返回第一页
     * @param limit 每页显示的资料数量，默认值20
     */
    public getElearningMaterials (start?: number, limit?: number) : Observable<Array<models.ElearningMaterial>> {
        const path = '/elearning/materials';
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (start !== undefined) {
            queryParameters.set('startId', String(start));
        }
        if (limit !== undefined) {
            queryParameters.set('limit', String(limit));
        }

        return this.getAPI(path+"?"+queryParameters)
            .map((response: Response) => response.json());
    }
    /**
     * 获取单个练习详细信息
     * @param exerciseId elearning练习的ID
     */
    public getElearningExerciseDetail(exerciseId: string) : Observable<models.ElearningExercise> {
        const path = '/elearning/exercises/{exerciseId}'.replace('{' + 'exerciseId' + '}', String(exerciseId));
        if (!exerciseId) {
            throw new Error('Missing required parameter exerciseId when calling getElearningExerciseDetail');
        }
        return this.getAPI(path)
            .map((response: Response) => response.json());
    }
    /**
     * 分页获取培训分类下的练习单篇列表
     * @param categoryId elearning培训类目Id
     * @param start 跳过的单篇数量，不传返回第一页
     * @param limit 每页显示的单篇数量，默认值20
     */
    public getElearningTrainingExercisePages (categoryId: string, start?: number, limit?: number) : Observable<Array<models.ElearningExercisePage>> {
        const path = '/elearning/training_categories/{categoryId}/exercise_pages'.replace('{' + 'categoryId' + '}', String(categoryId));

        let queryParameters = new URLSearchParams();
        if (!categoryId) {
            throw new Error('Missing required parameter categoryId when calling getElearningTrainingExercisePages');
        }
        if (start !== undefined) {
            queryParameters.set('start', String(start));
        }
        if (limit !== undefined) {
            queryParameters.set('limit', String(limit));
        }

        return this.getAPI(path+"?"+queryParameters)
            .map((response: Response) => response.json());
    }
    /**
     * 按顺序索引获取培训练习单篇
     * @param categoryId elearning类目Id
     * @param pageIndex elearning单篇顺序索引
     */
    public getElearningTrainingExercisePageByIndex (categoryId: string, pageIndex: number) : Observable<models.ElearningExercisePage> {
        const path ='/elearning/training_categories/{categoryId}/exercise_pages/{pageIndex}'.replace('{' + 'categoryId' + '}', String(categoryId)).replace('{' + 'pageIndex' + '}', String(pageIndex));

        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        if (categoryId === null || categoryId === undefined) {
            throw new Error('Required parameter categoryId was null or undefined when calling getElearningTrainingExercisePageByIndex.');
        }
        if (pageIndex === null || pageIndex === undefined) {
            throw new Error('Required parameter pageIndex was null or undefined when calling getElearningTrainingExercisePageByIndex.');
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
