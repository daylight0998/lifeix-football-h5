import { Component, Input, OnInit,ViewChild,ElementRef} from '@angular/core';

import {Post} from '../api/model/Post';
import {PostApi} from '../api/PostApi';
import {Category} from '../api/model/Category';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../environment';

//import { AnimationService, AnimationBuilder } from 'css-animator/';

@Component({
  selector: 'cf-sub-top-news',
  templateUrl: 'app/template/cf-sub-top-news.html'+environment.fileVersion,
  providers: [ PostApi],
  directives:[ROUTER_DIRECTIVES]
})
export class CFSubTopNewsComponent implements OnInit { 
	
	@Input() category: Category;

	currPost: Post;
	tops: Post[]=[];
	@ViewChild("currShowTitle") currShowTit: ElementRef;
	@ViewChild("currShowImg") currShowImg: ElementRef;
	//private animator: AnimationBuilder;
	
	constructor(private postApi: PostApi) {
		//this.animator =  animationService.builder();
	}

	getTopNews(catIds: string, limit: number) {
		this.postApi.getTopNews(catIds, limit).toPromise().then(
			(posts) => {
				this.tops = posts;
				this.currPost = posts[0];
			}
		)	
	}

	swichTop(item:Post){
		if(item.id != this.currPost.id) {
			this.currPost = item;
		}
		//this.animator.setType("pulse").setDuration(500).show(this.currShowImg.nativeElement);
		//this.animator.setType("zoomInRight").setDuration(300).show(this.currShowTit.nativeElement);


	}

	ngOnInit() {
		//console.log("====="+this.category.id);

		this.getTopNews(this.category.id, 9);
		//console.log("====" + this.categories.length);
	}
}