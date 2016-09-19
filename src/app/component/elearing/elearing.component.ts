import { Component, OnInit,AfterContentInit } from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {ElearningTrainingCategory} from '../../api/model/ElearningTrainingCategory';
import {Global} from '../../shared/global';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';
import {Category} from '../../api/model/models';

@Component({
	templateUrl: 'app/component/elearing/elearing.component.html'+environment.fileVersion,
	providers:[ElearningApi],
	directives:[ROUTER_DIRECTIVES]

})
export class ElearingComponent implements OnInit,AfterContentInit {

	trainingCats: ElearningTrainingCategory[];
	imgPrefix:string;
	category: Category;

	constructor(private elearingApi: ElearningApi,public global:Global,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
	}

	getTrainingCats(){
		this.elearingApi.getElearningTrainingCategories().toPromise().then(
			(cats)=>{
				this.trainingCats = cats;
			}
		);
	}

  	ngOnInit() {
			this.getTrainingCats();
  	}
  	ngAfterContentInit(){
			this.titleService.setTitle("教学培训"+this.global.title);
	}
}
