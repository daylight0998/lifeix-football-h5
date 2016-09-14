import { Component, OnInit,Input,Pipe } from '@angular/core';
import {PlayerApi} from '../../api/PlayerApi';
import {LikesApi} from '../../api/LikesApi';
import {Category, RefereeCategoryTop,RefereeCategory,Referee} from '../../api/model/models';
import {Global} from '../../shared/global';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { AnimationService, AnimationBuilder } from 'css-animator/';
import {environment} from '../../environment';

@Component({
	selector: 'cf-player-national',
	templateUrl: 'app/component/player/player-referee-list.component.html'+environment.fileVersion,
	providers: [AnimationService,PlayerApi,LikesApi],
	directives: [ROUTER_DIRECTIVES]
})
@Pipe({ name: "date", pure: false })
export class RefereeListComponent extends Global implements OnInit {


	@Input() category: Category;
	prefixImg: string;
	refCatTops: RefereeCategoryTop[];

	selectLikeItem:string;
	private animator: AnimationBuilder;

	fifaCat:RefereeCategory[];
	fifaSelectCat:string;
	matchSelectCat:string;
	matchCats:string[];
	matchCat:RefereeCategory[];
	nLikes ={};
	likeCache={};
	constructor( private playerApi: PlayerApi,private likesApi:LikesApi,global:Global,animationService: AnimationService) {
		super();
		this.prefixImg = global.prefixImg;
		this.animator = animationService.builder();
  	}



  	getFifaReferee(){
		this.playerApi.getReferees("fifa").toPromise().then((data)=>{
			this.refCatTops = data;
			this.fifaCat =  data[0].category;
			this.fifaSelectCat = data[0].topName;

		});
  	}

  	getMatchRefereeCats(){
  		this.playerApi.getRefereeLeagueCategory().toPromise().then((data)=>{
  			this.matchCats  = data;
  			this.matchSelectCat = data[0];

  			this.getMatchReferee(this.matchSelectCat);
  			this.getLikes("referee"+this.matchSelectCat)
  		});
  	}

  	getMatchReferee(group:string){
  		this.playerApi.getRefereesByLeague(group).toPromise().then((data)=>{
  			this.matchCat = data;
  		});
  	}


	chagePlayer(categoryName,type){

		if(type=='fifa') {
			for (var cat of this.refCatTops) {
				if(cat.topName==categoryName) {
					this.fifaCat = cat.category;
				}
			}
			this.fifaSelectCat = categoryName;
		}else if(type=='match'){
			this.matchSelectCat = categoryName;
			this.getMatchReferee(categoryName);
			this.getLikes("referee"+categoryName)
		}
	}

	getLikes(group:string){
		if(this.likeCache[group]) {
			return;
		}

		this.likesApi.getTeamLikes(group).toPromise().then((data)=>{
			this.likeCache[group]= data;
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
		this.likesApi.addLike(type,String(id),true).toPromise().then((data)=>{
			if(this.nLikes[type+"_"+String(id)]) {
				this.nLikes[type+"_"+String(id)].likeNum+=1;
				this.nLikes[type+"_"+String(id)].like=true;
			}
		});
		//this.animator.setType("fadeOutUp").setDuration(300).hide(e.target);
	}

  	ngOnInit() {
		this.getFifaReferee();
		this.getMatchRefereeCats();
		this.getLikes('refereeFIFA');

		//this.getTopNews();
		//this.getListNews();


  	}

}
