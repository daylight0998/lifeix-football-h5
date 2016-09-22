import { Component, OnInit,Pipe ,NgZone} from '@angular/core';
import { RouteParams } from '@angular/router-deprecated';
import {PlayerApi} from '../../api/PlayerApi';
import {LikesApi} from '../../api/LikesApi';
import {Title} from '@angular/platform-browser';
import {Player,Like} from '../../api/model/models';
import {Global} from '../../shared/global';
import {DateFormatPipe} from '../../utils/date-format-pipe';
import {environment} from '../../environment';
import {Toolkit} from '../../utils/useful';

@Component({
  templateUrl: 'app/component/player/player-detail.component.html'+environment.fileVersion,
  providers: [PlayerApi,LikesApi],
  pipes:[DateFormatPipe]
  //styleUrls: ['player-detail.component.css']
})
@Pipe({name:"date",pure:true})
export class PlayerDetailComponent implements OnInit {
	private likeType:string ="player";
	playerId: number;
	player: Player;
	prefixImg:string;
	like:Like;
	hideVideo:boolean =true;
	currVideo;
	level:number;
  isApp:boolean = false;

  constructor(private ngZone:NgZone,private playerApi:PlayerApi,private likesApi:LikesApi,private routeParams: RouteParams,public global:Global,private titleService: Title) {
		let id  = routeParams.get("id");
		let l = routeParams.get("level");

		this.playerId = Number(id);
		this.level = Number(l);
		this.prefixImg = global.prefixImg;

    this.ngZone.run(() => {
      this.isApp = Toolkit.isApp();
    });
	}

	playerDetail(){
		this.playerApi.getPlayer(this.playerId,this.level).toPromise().then(
			(player)=>{
				this.player = player;
				this.titleService.setTitle(this.player.name+this.global.title);
			}
		);
	}

	getLike(){
		this.likesApi.getTagetLikeds(String(this.playerId),this.likeType).toPromise().then((data)=>{
			this.like = data;
		});
	}

	addLike(like:boolean){

		if(this.like.like) {
			return ;
		}
		this.likesApi.addLike(this.likeType,String(this.playerId),like).toPromise().then((data)=>{
			if(like) {
				this.like.likeNum +=1;
			}else{
				this.like.unlikeNum+=1;
			}
			this.like.like = data.like;
		});
	}

	playVideo(item){
		this.hideVideo =false;
		this.currVideo = item;

	}
	hiddenVideo(){
		this.hideVideo = true;
		this.currVideo = null;
	}

  	ngOnInit() {
		this.playerDetail();
		this.getLike();
  	}

}
