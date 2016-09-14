import { Component,Output, OnInit,AfterContentInit } from '@angular/core';

import { Router,ROUTER_PROVIDERS,ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {CategoryApi} from '../api/CategoryApi';
import {Global}from '../shared/global';
import {ElearningApi} from '../api/ElearningApi';
import {Category,ElearningTrainingCategory,ElearningQuizCategory} from '../api/model/models';
import {HomeComponent} from './home';
import {environment} from '../environment';
import {Title} from '@angular/platform-browser';


@Component({
	selector: 'cf-home',
	templateUrl: 'app/component/football.component.html'+environment.fileVersion,
	//  styleUrls: ['app/component/home/home.component.css'],
	providers: [ROUTER_PROVIDERS, CategoryApi,ElearningApi],
	directives: [ROUTER_DIRECTIVES]
})

export class FootballComponent implements OnInit,AfterContentInit {

	category: Category;

	categories: Category[];
	trainingCats: ElearningTrainingCategory[];
	quizCats: ElearningQuizCategory[];
	selectPage:Category;
	hoverPage:Category;
	constructor(private router: Router,private elearingApi:ElearningApi, private categoryApi: CategoryApi,public global: Global,private titleService: Title) {

		//let routeName = router.root.currentInstruction.component.routeName;
		//console.log(router.root.cu);
	}
	getCategories() {
		this.categoryApi.getCategoryList().toPromise().then(
			(cats) => {
				this.categories = cats;
				this.global.category = cats[0];
				this.global.categories = cats;
				this.currCategory(this.categories);
			}
		);
	}

	currCategory(categories:Category[]){
		for (var c of categories) {
			var flag = this.router.isRouteActive(this.router.generate([c.page]));
			if(flag) {
				this.selectPage = c;
				break;
			}
		}
	}





	getTrainingCats(){
		this.elearingApi.getElearningTrainingCategories().toPromise().then(
			(cats)=>{
				this.trainingCats = cats;
			}
		);
	}
	getTestCats(){
		this.elearingApi.getElearningQuizCategories().toPromise().then(
			(cats)=>{
				this.quizCats = cats;
			}
		)
	}

	activeItem(item){
		this.selectPage = item;
		this.hoverPage = item;
	}

	hoverStyle(item){
		this.hoverPage =  this.selectPage;
		this.selectPage = item;
	}

	cleanStyle(item){
		this.selectPage = this.hoverPage;
		this.hoverPage = null;
	}

	selectStyle(item){
		
		if(item==this.selectPage||item==this.hoverPage) {

			return "#db3632"
		}
	}

	ngOnInit() {
		this.getCategories();
		this.getTrainingCats();
		this.getTestCats();
		// this.categories = [
		// 	{ id: "aaa", name: "首页",page:"Home" },
		// 	{ id: "bbb", name: "中国男足", page: "Player" },
		// 	{ id: "ccc", name: "中国女足", page: "Player" },
		// 	{ id: "ddd", name: "教练", page: "Player" },
		// 	{ id: "eee", name: "裁判", page: "Player" },
		// 	{ id: "fff", name: "规则培训", page: "Elearing" },
		// 	{ id: "ggg", name: "规则测试", page: "Etest" },
		// ]
		//console.log("aaaaa" + this.categories);
	}
	ngAfterContentInit(){
		if(this.category) {
			this.titleService.setTitle(this.category.name+this.global.title);
		}
	}

	onActivate(e, outlet){
		outlet.scrollTop = 0;
	}

}
