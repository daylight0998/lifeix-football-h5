import { Component, OnInit,Input } from '@angular/core';
import {PlayerApi} from '../../api/PlayerApi';
import {LikesApi} from '../../api/likesApi';
import {Category, CoachCategoryTop,Coach,CoachCategory} from '../../api/model/models';
import {Global} from '../../shared/global';
import {ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import { AnimationService, AnimationBuilder } from 'css-animator/';
import {DateFormatPipe} from '../../utils/date-format-pipe';
import {environment} from '../../environment';

@Component({
	selector: 'cf-player-national',
  templateUrl: 'app/component/player/player-coach-list.component.html'+environment.fileVersion,
  providers: [ AnimationService,PlayerApi,LikesApi],
  directives: [ROUTER_DIRECTIVES],
  pipes:[DateFormatPipe]
})
export class CoachListComponent implements OnInit {
	

	@Input() category: Category;

	mCatName: string;
	fCatName: string;
	prefixImg: string;
	maleCoachList: Coach[];
	femaleCoachList: Coach[];
	maleCoachCats: CoachCategory[];
	femaleCoachCats: CoachCategory[];
	nLikes ={};
	likeCache={};
	selectLikeItem:string;
	private animator: AnimationBuilder;


	constructor( private playerApi: PlayerApi,private likesApi:LikesApi,global:Global,animationService: AnimationService) {
		this.prefixImg = global.prefixImg;
		this.animator = animationService.builder();
  	}

  	getCoaches(){
		let coachTops: CoachCategoryTop[];
		this.playerApi.getNationalCoach().toPromise().then((data)=>{
			coachTops = data;
			for (var coachTop of coachTops) {
				if(coachTop.topName.indexOf('男足')>=0) {
					this.maleCoachCats = coachTop.category;
					this.maleCoachList = this.maleCoachCats[0].coaches;
					this.mCatName = this.maleCoachCats[0].categoryName;
				} else if (coachTop.topName.indexOf('女足') >=0) {
					this.femaleCoachCats = coachTop.category;
					
					this.femaleCoachList = this.femaleCoachCats[0].coaches;
					this.fCatName = this.femaleCoachCats[0].categoryName;
				}
			}
			//this.coachCats = coachTops[0].category;
		});
  	}

	chagePlayer(categoryName:string,gender:string){
		//console.log(categoryName);
		
		if(gender == 'f') {
			this.fCatName = categoryName;
			for (var cat of this.femaleCoachCats) {
				if (categoryName == cat.categoryName) {
					this.femaleCoachList = cat.coaches;
				}
			}
		}else if(gender =='m') {
			this.mCatName = categoryName;
			for (var cat of this.maleCoachCats) {
				if (categoryName == cat.categoryName) {
					this.maleCoachList = cat.coaches;
				}
			}
		}	
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
		//console.log(type+" "+id)
	}

	getLikes(group:string){
		this.likesApi.getTeamLikes(group).toPromise().then((data)=>{
			this.likeCache[group]= data;
			data.forEach((v)=>{
				this.nLikes[v.type+"_"+v.target] = v;
			})
		});
	}


  	ngOnInit() {
		this.getCoaches();
		this.getLikes('coachnational');
		//this.getTopNews();
		//this.getListNews();
  	}

}
