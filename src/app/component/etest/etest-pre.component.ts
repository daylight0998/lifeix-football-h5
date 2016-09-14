import { Component, OnInit } from '@angular/core';
import { RouteConfig, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';

import {Global} from '../../shared/global';
import {ElearningApi} from '../../api/ElearningApi';

import {ElearningQuizCategory, ElearningPage} from '../../api/model/models';
import {QuizResult} from './quiz-result';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';

@Component({
  templateUrl: 'app/component/etest/etest-start-pre.component.html'+environment.fileVersion,
  directives: [ROUTER_DIRECTIVES],
  providers: [ElearningApi, QuizResult]
 // styleUrls: ['etest.component.css']
})
export class EtestPreComponent implements OnInit {

	quizCats: ElearningQuizCategory[];
	imgPrefix: string;
	categoryId: string;

	pages: ElearningPage[] =[];

	currCat: ElearningQuizCategory;
	currPage: ElearningPage;

	quizResult:QuizResult;

	chooseTimer:number;
	r1_index:number;
	r2_index: number;

	catId:string;

	preLoading:boolean= false;
	sleepTime:boolean = false;
	constructor(params: RouteParams, private elearingApi: ElearningApi,public global: Global,private result: QuizResult,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
		this.categoryId = params.get("id");

		this.quizResult = result;

	}

	getTestCats(){
		this.elearingApi.getElearningQuizCategories().toPromise().then(
			(cats)=>{
				this.quizCats = cats;
				for (var cat of this.quizCats) {
					if(cat.id == this.categoryId) {
						this.currCat = cat;
						this.quizResult.passNum = this.currCat.rightCount;
							//SEO
						this.titleService.setTitle(this.currCat.name+this.global.title);
					}
				}
			}
		)
	}

	getQuizPage(id:string){
		this.pages =[];
		this.elearingApi.getElearningQuizPageList(id).toPromise().then((data)=>{
			
			data.forEach((v,i)=>{
				//if(i<3){
					this.pages.push(v);
				//}
			})

			//this.pages = data;
			this.quizResult.total = this.pages.length;
			//console.log(" total "+this.quizResult.total)
			if(this.preLoading) {
				this.startQuiz(0);
				this.preLoading = false;
			}

		});
	}

	startQuiz(index: number) {
		//console.log(" start "+index)

		if(this.sleepTime) {
			return;
		}
		if(index <=this.pages.length&&index>0&&this.quizResult.currR1<0) {
			this.quizResult.errorNum+=1;//未做题,直接跳过
		}

		this.sleepTime = true;
		window.setTimeout(()=>{//sleep 1s show the result
			this.sleepTime = null;
			if(index <this.pages.length) {
				this.setResult(index);
				this.currPage = this.pages[index];
			}else{
				//完成
				this.setResult(-2);

				if (this.quizResult.successNum >= this.quizResult.passNum){
					this.quizResult.msg="恭喜,您顺利通过了这次测试";
				}else{
					this.quizResult.msg = "很抱歉，您未能通过这次测试";
				}
			}
		},600);
	}

	private setResult(index: number) {
		this.quizResult.currIndex = index;
		this.quizResult.playend = false;
		this.quizResult.currR1 = -1;
		this.quizResult.currR2 = -1;

		this.r2_index = null;
		this.r1_index = null;
		if(this.chooseTimer) {
			window.clearTimeout(this.chooseTimer);
		}
	}


	videoPlayEnd(){
		this.quizResult.playend = true;

		const nextIndex: number = this.quizResult.currIndex + 1;
		this.chooseTimer = window.setTimeout(
			() => { 
				this.startQuiz(nextIndex); 
			}
		,10000);
	}

	chooseOption(postion:string,right:boolean,index:number){
		//console.log(right+" choose "+index+" option"+postion);
		if(this.sleepTime) {
			return;
		}
		if(postion=='r1') {
			this.quizResult.currR1 = (right)?1:0;
			this.r1_index = index;
		}
		// if (postion == 'r2') {
		// 	this.quizResult.currR2 = (right) ? 1 : 0;
		// 	this.r2_index = index;
		// }
		// if (this.quizResult.currR2 >= 0 && this.quizResult.currR1>=0) {
		// 	if (this.quizResult.currR2 > 0 && this.quizResult.currR2>0) {
		// 		this.quizResult.successNum += 1;
		// 	}else{
		// 		this.quizResult.errorNum += 1;
		// 	}
		// 	window.clearTimeout(this.chooseTimer);
		// 	this.startQuiz(this.quizResult.currIndex+1);
		// }
		if(this.quizResult.currR1>0) {
			this.quizResult.successNum += 1;
		}else{
			this.quizResult.errorNum += 1;
		}
		window.clearTimeout(this.chooseTimer);

		this.sleepTime = true;
		window.setTimeout(()=>{//sleep 1s show the result
			this.sleepTime = null;
			this.startQuiz(this.quizResult.currIndex+1);
		},1000);

	}

	continueQuiz(){
		this.initData();
		this.getQuizPage(this.catId);
	}

	initData(){
		this.currPage = null;
		this.quizResult.currIndex = -1;
		this.quizResult.playend = false;
		this.quizResult.currR1 = -1;
		this.quizResult.currR2 = -1;
		this.quizResult.total = 0;
		this.quizResult.successNum = 0;
		this.quizResult.errorNum = 0;
		this.r2_index = null;
		this.r1_index = null;
		if(this.chooseTimer) {
			window.clearTimeout(this.chooseTimer);
		}

	}

  	ngOnInit() {
		this.getTestCats();
		//this.getQuizPage();
  	}
  	preQuiz(id:string){
  		this.catId = id;
  		this.getQuizPage(id);
  		this.preLoading = true;
  	}
}
