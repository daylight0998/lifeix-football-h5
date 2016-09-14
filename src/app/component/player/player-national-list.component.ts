import { Component, OnInit,Input } from '@angular/core';
import {PlayerApi} from '../../api/PlayerApi';
import {LikesApi} from '../../api/likesApi';
import {Category, PlayerInfo, PlayerCategoryTop, PlayerCategory} from '../../api/model/models';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {Global} from '../../shared/global';
import { AnimationService, AnimationBuilder } from 'css-animator/';
import {DateFormatPipe} from '../../utils/date-format-pipe';
import {environment} from '../../environment';


@Component({
  selector: 'cf-player-national',
  templateUrl: 'app/component/player/player-national-list.component.html'+environment.fileVersion,
  providers: [ AnimationService,PlayerApi,LikesApi],
  directives: [ROUTER_DIRECTIVES],
  pipes:[DateFormatPipe]
})
export class PlayerListComponent implements OnInit {
	

	@Input() category: Category;

	playerTitle: string;
	playerCats:PlayerCategory[];
	playerList: PlayerInfo[];
	selectCatName: string;
	nationalLevel:number =1 ;

	selectLikeItem:string;
	prefixImg:string;
	private animator: AnimationBuilder;
	nLikes ={};
	likeCache={};
	groupTitle:string;

	constructor(private likesApi:LikesApi ,private playerApi: PlayerApi,global:Global,animationService: AnimationService) {
		this.prefixImg = global.prefixImg;
		this.animator = animationService.builder();
  	}

  	getPlayers(){
		let playerTops: PlayerCategoryTop[];
		this.playerApi.getNationalPlayer().toPromise().then((data)=>{
			playerTops = data;
			for (var playerTop of playerTops) {
				if (playerTop.topName ==this.playerTitle){
					this.playerCats = playerTop.category;
					break;
				}
			}
			this.playerList = this.playerCats[0].players;
			this.selectCatName = this.playerCats[0].categoryName;
			this.nationalLevel = this.playerCats[0].nationalLevel;
		});
  	}

  	initPlayTitle(category:Category){
  		if(category.page.toLowerCase().indexOf('-man')>0) {
				this.playerTitle = '中国男足';
				this.groupTitle='player中国男足国家队'
		} else if (category.page.toLowerCase().indexOf('-woman')>0) {
			this.playerTitle = '中国女足';
			this.groupTitle='player中国女足女足国家队'
		}else {
			this.playerTitle = '中国男足';
			this.groupTitle='player中国男足国家队'
		}
  	}

	chagePlayer(categoryName){
		for (var cat of this.playerCats) {
			if(categoryName == cat.categoryName) {
				this.playerList = cat.players;
				this.nationalLevel = cat.nationalLevel;
			}
		}
		this.selectCatName = categoryName;
		this.getGroupTeamLike('player'+this.playerTitle+this.selectCatName);


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
		//console.log(type+" "+id+" "+this.nLikes[type+"_"+String(id)]);

		this.likesApi.addLike(type,String(id),true).toPromise().then((data)=>{
			if(this.nLikes[type+"_"+String(id)]) {
				this.nLikes[type+"_"+String(id)].likeNum+=1;
				this.nLikes[type+"_"+String(id)].like =true;
			}
		});
		//this.animator.setType("fadeOutUp").setDuration(300).hide(e.target);
		
	}

	getGroupTeamLike(group:string){
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


  	ngOnInit() {
		this.initPlayTitle(this.category);
		this.getPlayers();
		this.getGroupTeamLike(this.groupTitle);
		//this.getTopNews();
		//this.getListNews();
  	}

}
