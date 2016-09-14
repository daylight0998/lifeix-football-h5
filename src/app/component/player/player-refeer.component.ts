import { Component, OnInit,AfterContentInit } from '@angular/core';
import {Global}from '../../shared/global';
import {Category} from '../../api/model/Category';
import {CategoryApi} from '../../api/CategoryApi';
import {Router,ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CFNewsListComponent} from '../cfNewsList.component';
import {CFSubTopNewsComponent} from '../cfSubTopNews.component';
import {RefereeListComponent} from './player-referee-list.component';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';


@Component({
  templateUrl: 'app/component/player/player.component.html'+environment.fileVersion,
  providers: [CategoryApi],
  directives: [ROUTER_DIRECTIVES, CFSubTopNewsComponent, CFNewsListComponent, RefereeListComponent]
  //styleUrls: ['app/component/player/player.component.css']
})
export class RefeerComponent implements OnInit,AfterContentInit {

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

  	currCategory(){
		let routeName = this.currRouter.root.currentInstruction.component.routeName;
		for (var cat of this.categories) {
			if(cat.page == routeName) {
				this.category = cat;
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
