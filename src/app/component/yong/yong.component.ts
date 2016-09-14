import { Component, OnInit,AfterContentInit} from '@angular/core';
import {CategoryApi} from '../../api/CategoryApi';
import {Category} from '../../api/model/models';
import {CFNewsListComponent} from '../cfNewsList.component';
import {CFSubTopNewsComponent} from '../cfSubTopNews.component';
import {Global}from '../../shared/global';
import {Router,ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'app/component/yong/yong.component.html'+environment.fileVersion,
  directives:[ROUTER_DIRECTIVES,CFSubTopNewsComponent,CFNewsListComponent]
})
export class YongComponent implements OnInit,AfterContentInit {

 	category: Category;
	currRouter: Router;
	private categories: Category[];
	constructor(router: Router,private categoryApi:CategoryApi,public global: Global,private titleService: Title) {

		this.currRouter = router;

		this.categories = global.categories;
		if(!this.categories||this.categories.length<1) {
			this.getCategories();
		}else{
			this.currCategory();
		}
	}

	currCategory() {
		for (var cat of this.categories) {
			if (cat.page == 'CN-Youth-Player') {
				this.category = cat;
				break;
			}
		}
	}

	getCategories() {
		this.categoryApi.getCategoryList().toPromise().then(
			(cats) => {
				this.categories = cats;
				this.global.categories = cats;
				this.currCategory();
			}
		);
	}

	ngOnInit() {
	}
	ngAfterContentInit(){
		if(this.category) {
			this.titleService.setTitle(this.category.name+this.global.title);
		}
	}

}
