import { Component, Input, OnInit,Pipe,ElementRef,ViewChild,
	trigger,state,style,transition,animate} from '@angular/core';
import * as model from '../api/model/models';
import {MatchersApi} from '../api/MatchersApi';
import {Global}from '../shared/global';
import { ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {DateFormatPipe} from '../utils/date-format-pipe';
import {Observable} from 'rxjs/Rx';
import {DateTimeUtil,TimeCountDown} from '../utils/datetime-util';
import {environment} from '../environment';

@Component({
  selector: 'cf-china-timeline',
  templateUrl: 'app/template/cf-china-timeline.html'+environment.fileVersion,
  providers: [MatchersApi,DateTimeUtil],
  directives: [ROUTER_DIRECTIVES],
  pipes:[DateFormatPipe],
  animations:[
  	trigger('cfcd',[
  		state('hide',style({display:'none',height:'0px',opacity:'0',transform:'scale(0)'})),
  		state('show',style({display:'block',height:'*',opacity:'1',transform:'scale(1)'})),
  		transition('show=>hide',animate('500ms linear')),
  		transition('hide=>show',animate('500ms linear')),

  	])
  ]
})
@Pipe({name:"date",pure:false})
export class CFChinaTimeLineComponent implements OnInit{ 
	@Input() category: model.Category;
	@ViewChild('cf_countdown') cd:ElementRef;
	
	matchers: model.MatchInfo[];

	selectMatcher:model.MatchInfo;
	prefixImg:string;
	courtImages:string;
	currMatcher:model.MatchInfo;
	until:TimeCountDown;
	cfcdAnimate:string ='hide'; 
	zhibo:model.MatchZhiBo;
	cdTimer:number;
	cdShow:boolean = false;

	constructor(private matcherApi: MatchersApi,private global:Global,private datetimeUtil:DateTimeUtil) {
		this.prefixImg = global.prefixImg;
		this.courtImages= global.bgImages;
	}


	countDown(time){

		Observable.interval(1000).map((x) => {
			 this.until = this.datetimeUtil.countDown(time-x*1000);
		}).subscribe();
	}

	toggleAD(){
		//this.animator
		if(this.cfcdAnimate=='hide') {
			this.cfcdAnimate = 'show'
		}else {
			this.cfcdAnimate = 'hide';
		}
	}

	onScroll(e){

		if(this.cdShow) {
			return;
		}

		var scrollTop = window.scrollY;
		//var clientHeight = document.documentElement.clientHeight;
		var cdTop = this.cd.nativeElement.offsetTop;
		if((scrollTop+360)>=cdTop) {
			this.cfcdAnimate = 'show';
			this.cdShow = true;
		}else{
			return;
		}

		if(this.cdTimer) {
			window.clearTimeout(this.cdTimer);
		}

		this.cdTimer =window.setTimeout(()=>{
			this.cfcdAnimate = 'hide';
		},5000);
	}


	getTimeLineMatch(){

		var newTime = new Date().getTime();

		this.matcherApi.findTimeLineMatchs(5, 1).toPromise().then(
			(matchers)=>{
				this.matchers = matchers;
				for (var m of matchers) {
					//console.log("-----"+m.startDate);
					var matchTime = m.startTime;
					if(!matchTime) {//m.startTime maybe is null;
						matchTime = m.startDate;
					}
					if (newTime.valueOf()<=matchTime.valueOf()) {
						this.selectMatcher = m;
						break;
					}
				}
				if(!this.selectMatcher) {
					this.selectMatcher = matchers[0];
				}
				this.currMatcher = this.selectMatcher;
				
				this.setBgImg();

				this.getCurrMatchZhibo();
			}
		);
	}

	//背景图片
	setBgImg(){
		if(this.selectMatcher.court&&this.selectMatcher.court.images) {
			this.courtImages =this.prefixImg+ this.selectMatcher.court.images;
		}else{
			this.courtImages= this.global.bgImages;
		}
	}

	swichMatch(id:number){
		for (var m of this.matchers) {
			if(m.id == id) {
				this.selectMatcher = m;
				this.setBgImg();
				break;
			}
		}
	}

	getCurrMatchZhibo(){
		this.matcherApi.findCurrentMatchZhibo(5).toPromise().then((data)=>{
			if(data) {
				this.zhibo = data.zhibo;
				if(data.match) {
					this.currMatcher = data.match;
					this.selectMatcher = data.match;
				}
			}
			this.countDown(this.currMatcher.startTime);
		});
	}

	ngOnInit() {
		
		this.getTimeLineMatch();
	}
}