import { Component, OnInit,ViewChild,ElementRef,Renderer,AfterContentInit} from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {Global} from '../../shared/global';
import { RouteConfig,RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ElearningPage,ElearningTrainingCategory,ElearningExercise} from '../../api/model/models';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';

@Component({
	templateUrl: 'app/component/elearing/elearing-animate-detail.component.html'+environment.fileVersion,
	providers:[ElearningApi],
	directives:[ROUTER_DIRECTIVES]
})
export class ElearingAnimateDetailComponent implements OnInit {

	@ViewChild("videoplayer") videoplayer: ElementRef;
	@ViewChild("videoplayer1") videoplayer1: ElementRef;
	@ViewChild("videoplayer2") videoplayer2: ElementRef;
	imgPrefix:string;
	videoId:string;
	video: ElearningExercise;
	categoryId: string;
	isVideoShow: boolean;
	detailShow: string;
	videoIndex:number;
	nextPage:ElearningExercise;
	prePage:ElearningExercise;
	focusType:number;
	traniningCat:ElearningTrainingCategory;
	subjectId:string;
	videoPath:string;
	videoEle;

	constructor(private params:RouteParams,private elearingApi: ElearningApi,public global:Global,private renderer:Renderer,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
		this.subjectId = params.get('subjectId');
		this.categoryId = params.get("categoryId");
		this.videoId = params.get("id");
		this.videoIndex =Number(params.get("index"));
		this.isVideoShow = true;
		this.focusType = 0;
		if(global.trainingCats) {
			for (var cat of global.trainingCats) {
				if(cat.id == this.categoryId) {
					this.traniningCat = cat;
				}
			}
		}
		this.renderer.listenGlobal("document","keydown",(event)=>{
			this.videoProcess(event);
		})

	}

	getVideoDetail(){
		this.elearingApi.getElearningExerciseDetail(this.videoId).toPromise().then((video)=>{
			this.video = video;
			this.videoPath = this.video.animation;

			this.titleService.setTitle(this.video.title+this.global.title);
		});

	}

	getPageNext(){
		if(!this.categoryId) {
			return;
		}
		this.elearingApi.getElearningTrainingExercisePageByIndex(this.categoryId,this.videoIndex+1).toPromise().then(
			(result) => {
				this.nextPage = result;
			}
		);
	}

	getPagePre(){
		if(!this.categoryId) {
			return;
		}
		if(this.videoIndex<2) {
			return ;
		}
		this.elearingApi.getElearningTrainingExercisePageByIndex(this.categoryId,this.videoIndex-1).toPromise().then(
			(result) => {
				this.prePage = result;
			}
		);
	}


	focusImportant(type:number){
		this.focusType = type;
		//console.log(this.focusType);
		this.isVideoShow = false;
		if(type==0){
			//this.videoPath = this.video.animation;
			this.videoEle = this.videoplayer.nativeElement;
		}else if(type==1) {
			//this.videoPath = this.video.video1;
			this.videoEle = this.videoplayer1.nativeElement;
		}else if(type==2) {
			//this.videoPath = this.video.video2;
			this.videoEle = this.videoplayer2.nativeElement;
		}else if(type==3){
			this.detailShow = this.video.description;
		}else if(type==4){
			this.detailShow = this.video.material;
		}else if(type==5){
			this.detailShow = this.video.objectives;
		}else{
			this.detailShow = null;
		}
		if(!this.videoEle) {
			this.videoEle = this.videoplayer.nativeElement;
		}
		this.videoEle.pause();
		if(type<3) {
			this.videoEle.load();
			this.hidePop();
			this.videoEle.play();
		}
		
		//console.log(this.isVideoShow +" show ");
	}

	hidePop(){
		this.isVideoShow = true;
		this.videoEle.play();
		this.detailShow = null;
		//this.focusType = null;
	}

	videoProcess(event){
		if(event.keyCode==37) {
			this.videoEle.currentTime-=1/12;	
		}else if(event.keyCode==39) {
			this.videoEle.currentTime+=1/12;
		}
	}

  	ngOnInit() {
		this.getVideoDetail();	
		this.getPagePre();
		this.getPageNext();
  	}

  	ngAfterContentInit(){
  		console.log(this.video);
  	}

}
