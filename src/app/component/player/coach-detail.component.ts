import { Component, OnInit,Pipe } from '@angular/core';
import { RouteParams,Router } from '@angular/router-deprecated';
import {PlayerApi} from '../../api/PlayerApi';
import {LikesApi} from '../../api/LikesApi';
import {DateFormatPipe} from '../../utils/date-format-pipe';
import {Coach,Like} from '../../api/model/models';
import {Global} from '../../shared/global';
import {Title} from '@angular/platform-browser';
import {environment} from '../../environment';

@Component({
  templateUrl: 'app/component/player/coach-detail.component.html'+environment.fileVersion,
  providers: [PlayerApi,LikesApi],
  pipes:[DateFormatPipe]
  //styleUrls: ['player-detail.component.css']
})
@Pipe({name:"date",pure:true})
export class CoachDetailComponent implements OnInit {
	private likeType:string ="coach";
	coachId: number;
	player;
	prefixImg;
	like:Like;
	routeName:string;

	constructor(router: Router,private playerApi:PlayerApi,private likesApi:LikesApi,private routeParams: RouteParams,public global:Global,private titleService: Title) { 
		
		let id  = routeParams.get("id");
		this.coachId = Number(id);
		this.prefixImg = this.global.prefixImg;

		this.routeName = router.root.currentInstruction.component.routeName;
		//console.log(routeName);
	}

	coachDetail(){
		if(this.routeName.indexOf('Leader')>=0) {
			this.likeType = 'leader';
			this.playerApi.getStaff(this.coachId).toPromise().then((data)=>{
				this.player = data;
				this.titleService.setTitle(this.player.name+this.global.title);
			});
		}else{
			this.playerApi.getCoach(this.coachId).toPromise().then(
				(data)=>{
					this.player = data;
					this.titleService.setTitle(this.player.name+this.global.title);
				}
			);
		}
		
		
	}

	getLike(){
		this.likesApi.getTagetLikeds(String(this.coachId),this.likeType).toPromise().then((data)=>{
			this.like = data;
		});
	}

	addLike(like:boolean){

		if(this.like.like) {
			return ;
		}
		this.likesApi.addLike(this.likeType,String(this.coachId),like).toPromise().then((data)=>{
			if(like) {
				this.like.likeNum +=1;
			}else{
				this.like.unlikeNum+=1;
			}
			this.like.like = data.like;
		});
	}

  	ngOnInit() {
		this.coachDetail();
		this.getLike();
  	}

}
