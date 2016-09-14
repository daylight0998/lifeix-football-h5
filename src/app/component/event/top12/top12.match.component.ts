import { Component, OnInit,Pipe } from '@angular/core';
import { Router,ROUTER_DIRECTIVES,RouteParams } from '@angular/router-deprecated';
import { DomSanitizationService,SafeResourceUrl,Title} from '@angular/platform-browser';
import {Category,Competition,Team,MatchInfo,Match,MatchZhiBo} from '../../../api/model/models';
import {Base} from '../../base';
import {Global}from '../../../shared/global';
import {MatchersApi} from '../../../api/MatchersApi';
import {DateFormatPipe} from '../../../utils/date-format-pipe';
import {environment} from '../../../environment';


@Component({
	templateUrl: 'app/component/event/top12/top12.match.html'+environment.fileVersion,
	providers: [MatchersApi],
	directives:[ROUTER_DIRECTIVES],
	pipes:[DateFormatPipe]
  //styleUrls: ['top12.component.css']
})
@Pipe({name:"date",pure:false})
export class Top12MatchComponent implements OnInit {

	matchers: MatchInfo[];
	prefixImg:string;
	currMatch:Match;
	matchId:number;
	emptyPlayer:number[]=[0,1,2,3,4,5,6,7,8,9,10];
	emptySecPlayer:number[]=[0,1,2,3,4,5,6];
	courtImages:string;
	zhibo:MatchZhiBo;
	zhiboUrl:SafeResourceUrl;
	constructor(router: Router,params:RouteParams,public global: Global, private matchersApi: MatchersApi,private titleService: Title,private domService: DomSanitizationService) {
		this.prefixImg = global.prefixImg;
		this.matchId =  Number(params.get("id"));
		this.courtImages =  global.bgImages;
	}

	getTimeLineMatch(){
		this.matchersApi.findTimeLineMatchs(5, 1).toPromise().then(
			(matchers)=>{
				this.matchers = matchers;
				
			}
		);
	}

	getMatch(){
		this.matchersApi.getMatch(5,this.matchId).toPromise().then((result)=>{
			this.currMatch = result;
			if(this.currMatch.court&&this.currMatch.court.images) {
				this.courtImages =this.prefixImg+ this.currMatch.court.images;
			}else{
				this.courtImages = this.global.bgImages;
			}

			var pTitle =this.currMatch.hostTeam.teamInfo.name+" VS "+this.currMatch.awayTeam.teamInfo.name

			this.titleService.setTitle(pTitle+"-"+this.currMatch.competitionInfo.name+this.currMatch.stage+this.global.title);
		});
	}

	getMatchZhibo(){
		this.matchersApi.getMatchZhibo(5,this.matchId).toPromise().then((data)=>{
			this.zhibo =  data;
			this.zhiboUrl = this.domService.bypassSecurityTrustResourceUrl(data.videoUrl);
		});
	}

  	ngOnInit() {
  		this.getMatchZhibo();
	  	this.getTimeLineMatch();
	  	this.getMatch();
  	}

}
