import { Component, OnInit } from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {ElearningPage,ElearningTrainingCategory} from '../../api/model/models';

import {Global} from '../../shared/global';
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';


@Component({
	templateUrl: 'app/component/elearing/elearing-list.component.html'+environment.fileVersion,
	providers:[ElearningApi],
	directives:[ROUTER_DIRECTIVES]
})
export class ElearingListComponent implements OnInit {

	trainingCats: ElearningTrainingCategory[];
	imgPrefix:string;
	categoryId: string;
	selectCatId: string;
	pages: ElearningPage[];
	constructor(private params: RouteParams, private elearingApi: ElearningApi, public global: Global,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
		this.categoryId = this.params.get("id");
	}

	getTrainingSubCats(){
		this.elearingApi.getElearningTrainingSubCategories(this.categoryId).toPromise().then(
			(cats)=>{
				this.trainingCats = cats;
				this.selectCatId = cats[0].id;
				this.getElearningTrainingPageList(this.selectCatId);

				this.titleService.setTitle(this.trainingCats[0].name+this.global.title);

			}
		);
	}

	getElearningTrainingPageList(catId:string){
		this.elearingApi.getElearningTrainingPageList(catId, 0, 30).toPromise().then(
			(result)=>{
				this.pages = result;
			}
		);
	}

  	ngOnInit() {
		this.getTrainingSubCats();
		//this.getElearningTrainingPageList();
  	}

}
