import { Component } from '@angular/core';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

import {BaseApi} from './baseApi';
import * as models from './model/models';

'use strict';
@Injectable()
export class CategoryApi extends BaseApi{

    constructor(protected http: Http, @Optional() basePath: string) {
        super(http,basePath);
    }
  
    /**
     * 获取整个类目
     * 将数据库（缓存）中所有类目都返回
     */
    public getCategoryList(): Observable<Array<models.Category>> {
        const path ='/app/menus/web';
       
        return this.getAPI(path).map((response: Response) => response.json());
    }


}
