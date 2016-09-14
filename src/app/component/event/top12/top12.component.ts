import { Component, OnInit,Pipe } from '@angular/core';
import { Router,ROUTER_DIRECTIVES } from '@angular/router-deprecated';

import {Category,Competition,Team} from '../../../api/model/models';
import {Base} from '../../base';
import {Global}from '../../../shared/global';
import {MatchersApi} from '../../../api/MatchersApi';
import {MatchGroup,MatchStage,MatchTop12} from './match-team';
import {environment} from '../../../environment';
import {DateFormatPipe} from '../../../utils/date-format-pipe';
import {CategoryApi} from '../../../api/CategoryApi';

import {Title} from '@angular/platform-browser';

@Component({
	templateUrl: 'app/component/event/top12/top12.component.html'+environment.fileVersion,
	providers: [MatchersApi,CategoryApi, MatchTop12],
	directives:[ROUTER_DIRECTIVES],
	pipes:[DateFormatPipe]
  //styleUrls: ['top12.component.css']
})
@Pipe({name:"date",pure:false})
export class Top12Component implements OnInit {

	category: Category;	
	
	competition: Competition;
	aTeams: Team[]=[];
	bTeams: Team[]=[];
	matchStages: MatchStage[];
	prefixImg:string;
	private categories: Category[];
	constructor(router: Router,public global: Global, private matchersApi: MatchersApi,private categoryApi:CategoryApi, private matchTop12:MatchTop12,private titleService: Title) {
		if(!this.categories||this.categories.length<1) {
			this.getCategories();
		}else{
			this.currCategory();
		}
		this.prefixImg = global.prefixImg;
	}


	currCategory() {
	    for (var cat of this.categories) {
		    if (cat.page == 'Home') {//这里12top 对应category为home  
			   this.category = cat;
			   this.getCompetition(cat.id);
			   this.titleService.setTitle(this.category.name+this.global.title);
			   break;
		    }
	    }
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
  	
  	getCompetition(id){
	    this.matchersApi.getCompetitionCategories(id).toPromise().then(
		  	(data)=>{
				this.competition = data;
				this.groupTeam(this.competition.teams);
				this.matchStages =this.matchTop12.sortMatches(this.competition.matches);
		  	}
	    );
  	}

	groupTeam(teams:Team[]){
		for (var team of teams) {
			if(team.group=='A') {
				this.aTeams.push(team);
			}else if(team.group=='B'){
				this.bTeams.push(team);
			}
		}
	}  

  	ngOnInit() {
	  
  	}

}
