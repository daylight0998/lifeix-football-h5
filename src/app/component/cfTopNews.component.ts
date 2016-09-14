import { Component, Input, OnInit } from '@angular/core';
import { NgSwitch,NgSwitchCase,NgSwitchDefault} from '@angular/common';
import {Post} from '../api/model/Post';
import {PostApi} from '../api/PostApi';
import {Category} from '../api/model/Category';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DateFormatPipe} from '../utils/date-format-pipe';
import {environment} from '../environment';


@Component({
  selector: 'cf-top-news',
  templateUrl: 'app/template/cf-top-news.html'+environment.fileVersion,
  providers: [PostApi],
  directives: [ROUTER_DIRECTIVES,NgSwitch,NgSwitchCase,NgSwitchDefault],
  pipes:[DateFormatPipe]
})
export class CFTopNewsComponent implements OnInit { 
	@Input() category: Category;

	
	posts: Post[];

	constructor(private postApi: PostApi) {
		//console.log("CFTopNewsComponent----");
	}

	getTopNews(catIds: string, limit: number) {
		this.postApi.getTopNews(catIds, limit).toPromise().then(
			(posts) => {
				this.posts = posts;
				//console.log("CFTopNewsComponent----"+posts.length);
			}
		)	
	}

	ngOnInit() {
		this.getTopNews(this.category.id, 9);
		//console.log("====" + this.categories.length);
	}
}