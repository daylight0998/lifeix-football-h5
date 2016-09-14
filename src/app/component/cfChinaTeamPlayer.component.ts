import { Component, Input, OnInit} from '@angular/core';
import {CompetitionteamApi} from '../api/CompetitionteamApi';
import {LikesApi} from '../api/likesApi';
import * as model from '../api/model/models';
import { ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Global} from '../shared/global';
//import { AnimationService, AnimationBuilder } from 'css-animator/';
import {DateFormatPipe} from '../utils/date-format-pipe';
import {environment} from '../environment';

@Component({
  selector: 'cf-china-team-player',
  templateUrl: 'app/template/cf-china-team-player.html'+environment.fileVersion,
  providers: [CompetitionteamApi,LikesApi],
  directives: [ROUTER_DIRECTIVES],
  pipes:[DateFormatPipe]
})
export class CFChinaTeamPlayerComponent implements OnInit { 


	@Input() category: model.Category;
	
	team: model.CompetitionTeam;
	chiefCoach: model.Coach;
	assistantCoach: model.Coach[];
	teamLeader:model.Staff;
	players: model.PlayerInfo[];
	staffs:model.Staff[];
	//likes:model.Like[];
	selectLikeItem:string;
	prefixImg:string;
	//private animator: AnimationBuilder;
	nLikes ={};

	constructor(private likesApi:LikesApi,private competitionTeamApi: CompetitionteamApi,global:Global) {

		this.prefixImg = global.prefixImg;
		//this.animator = animationService.builder();
  	}


	findCompetitionTeam(){
		this.competitionTeamApi.findCompetitionTeam(5, 1).toPromise().then(
			(team) => {
				this.team = team;
				this.chiefCoach = team.chiefCoach;
				this.assistantCoach = team.assistantCoach;
				this.teamLeader = team.teamLeader;
				this.players = team.players;
				this.staffs =team.staffs;
				//console.log(this.team.chiefCoach+"=====");
			}
		);
	}

	getNationalTeamLike(){
		this.likesApi.getTeamLikes("nationalteam").toPromise().then((data)=>{
			//this.likes = data;
			data.forEach((v)=>{
				this.nLikes[v.type+"_"+v.target] = v;
			})
		});
	}

	showLike(type:string,id:number){
		var flag = (this.selectLikeItem!= type+"_"+id);
		return flag;
	}

	displayLike(type:string,id:number){
		this.selectLikeItem = type +"_"+id;
	}

	hiddenLike(type:string,id:number){
		this.selectLikeItem = null;
	}

	addLike(e,type,id){
	//console.log(type+"_"+id);
		this.likesApi.addLike(type,String(id),true).toPromise().then((data)=>{
			if(this.nLikes[type+"_"+String(id)]) {
				this.nLikes[type+"_"+String(id)].likeNum+=1;
				this.nLikes[type+"_"+String(id)].like= true;
			}
		});
		//this.animator.setType("fadeOutUp").setDuration(1000).hide(e.target);
	}

	test(e){
		//this.animator.setType("fadeOutUp").setDuration(1000).hide(e.target);
	}


	ngOnInit() {
		this.getNationalTeamLike();
		this.findCompetitionTeam();
	}

}
