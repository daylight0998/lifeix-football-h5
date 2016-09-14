import { Component, Input, OnInit } from '@angular/core';
import {Post} from '../api/model/Post';
import {PostApi} from '../api/PostApi';
import {Category} from '../api/model/Category';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../environment';

@Component({
  selector: 'cf-news-list',
  templateUrl: 'app/template/cf-news-list.html'+environment.fileVersion,
  providers: [PostApi],
  directives:[ROUTER_DIRECTIVES]
})

export class CFNewsListComponent implements OnInit{

	@Input() category: Category;

	posts: Post[] =[];

	searchDate:string;
	pageSize:number =27;
	constructor(private postApi: PostApi) {
		
	}


	searchNews(categoryId:string,date:string,limit:number){
		this.searchDate = null;
		this.postApi.searchNews(categoryId, date,limit).toPromise().then(
			(data) => {
				data.forEach((p,index)=>{
					if((index+1)<limit) {
						this.posts.push(p);
					}
					if((index+1)==(limit-1)) {
						var time:Date = new Date(p.createTime.valueOf());
						//console.log( time.toISOString()+"ssssss"+p.title)
						this.searchDate = time.toISOString();
					}
				})
			}
		);
	}

	ngOnInit() {

		this.searchNews(this.category.id,this.searchDate,this.pageSize+1);
		
	}

	moreNews(){
		this.searchNews(this.category.id,this.searchDate,18+1);
	}

}