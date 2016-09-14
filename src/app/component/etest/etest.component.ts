import { Component, OnInit } from '@angular/core';
import {  ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ElearningQuizCategory} from '../../api/model/ElearningQuizCategory';
import {Global} from '../../shared/global';
import {ElearningApi} from '../../api/ElearningApi';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';


@Component({
  templateUrl: 'app/component/etest/etest.component.html'+environment.fileVersion,
  directives: [ROUTER_DIRECTIVES],
  providers: [ElearningApi]
 // styleUrls: ['etest.component.css']
})
export class EtestComponent implements OnInit {

	quizCats: ElearningQuizCategory[];
	imgPrefix: string;
	constructor(private elearingApi: ElearningApi,public global: Global,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
	}

	getTestCats(){
		this.elearingApi.getElearningQuizCategories().toPromise().then(
			(cats)=>{
				this.quizCats = cats;
			}
		)
	}

  	ngOnInit() {
		this.getTestCats();
  	}
	ngAfterContentInit(){
		this.titleService.setTitle("规则测试"+this.global.title);
	}

}
