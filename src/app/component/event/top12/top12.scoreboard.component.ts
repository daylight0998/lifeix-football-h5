import { Component, OnInit,Pipe } from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {Category,CompetitionGroup} from '../../../api/model/models';
import {Global}from '../../../shared/global';
import {CompetitionteamApi} from '../../../api/CompetitionteamApi';
import {environment} from '../../../environment';
import {Title} from '@angular/platform-browser';

@Component({
	templateUrl: 'app/component/event/top12/top12.scoreboard.component.html'+environment.fileVersion,
	providers: [CompetitionteamApi],
	directives:[ROUTER_DIRECTIVES]
})
@Pipe({name:"date",pure:false})
export class Top12ScoreboardComponent implements OnInit {

	aGroup:CompetitionGroup;
	bGroup:CompetitionGroup;
	prefixImg:string;
	constructor(router: Router, global: Global,private cmAPI:CompetitionteamApi,private titleService: Title) {
		this.prefixImg = global.prefixImg;
		this.titleService.setTitle("十二强赛事积分榜"+global.title);
		window.scrollTo(0,0);
	}

	getGroup(){
		this.cmAPI.getCompetitionGroup(5).toPromise().then((data)=>{
			for (var o of data) {
				if(o.groupName == 'A') {
					this.aGroup =  o;
				}
				if(o.groupName == 'B') {
					this.bGroup = o;
				}
			}
		});
	}


  ngOnInit() {
	  this.getGroup();
  }

}
