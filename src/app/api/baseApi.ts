
'use strict';
import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {environment} from '../environment';
export class BaseApi{
	//protected basePath = 'http://192.168.50.154:8000/football';
    protected basePath = environment.apiPath;
    protected key = 'visitor';
    public defaultHeaders: Headers = new Headers();
	constructor(protected http: Http, @Optional() basePath: string) {
     
        if (basePath) {
            this.basePath = basePath;
        }
    }
	protected getAPI(path){

        let requestUrl = this.basePath + path;

		let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        queryParameters.set("key",this.key);
        let requestOptions: RequestOptionsArgs = {
            method: 'GET',
            headers: headerParams,
            search: queryParameters
        };

        return this.http.request(requestUrl, requestOptions);
	}

    protected postAPI(path:string,formStr:string){

        let requestUrl = this.basePath + path;
        let queryParameters = new URLSearchParams();
        let headerParams = this.defaultHeaders;
        headerParams.set('Content-Type', 'application/x-www-form-urlencoded');

        let requestOptions: RequestOptionsArgs = {
            method: 'POST',
            headers: headerParams,
            search: queryParameters
        };
        requestOptions.body = formStr;

        return this.http.post(requestUrl,requestOptions.body, requestOptions);
    }

}