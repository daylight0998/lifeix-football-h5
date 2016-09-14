import { Component, OnInit,Output,Input } from '@angular/core';

//import {CategoryApi} from '../../api/CategoryApi';
import {Category} from '../../api/model/Category';
//import {CFTopNewsComponent} from '../cfTopNews.component';
//import {CFNewsListComponent} from '../cfNewsList.component';
//import {CFChinaTeamPlayerComponent} from '../cfChinaTeamPlayer.component'
//import {CFChinaTimeLineComponent} from '../cfChinaTimeline.component'
import { Router} from '@angular/router';
import {Global}from '../../shared/global';
import {CategoryApi} from '../../api/CategoryApi';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'app/component/home/home.component.html'+environment.fileVersion,
//  styleUrls: ['app/component/home/home.component.css'],
//  providers: [CategoryApi],
//  directives: [CFTopNewsComponent, CFChinaTimeLineComponent, CFChinaTeamPlayerComponent, CFNewsListComponent]
})

export class HomeComponent implements OnInit {

  @Input() category: Category;

  private categories: Category[];
  constructor(public global: Global,private categoryApi:CategoryApi,private titleService: Title) {
    this.categories = global.categories;
	if(!this.category) {
		this.getCategories();
	}
	// else{
	// 	this.currCategory();
	// }
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

	currCategory() {
		for (var cat of this.categories) {
			if (cat.page == 'Home') {
				this.category = cat;
				this.titleService.setTitle("中国足球网");
				break;
			}
		}
	}

  ngOnInit() {

  }

}
