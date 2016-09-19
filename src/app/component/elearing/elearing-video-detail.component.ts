import { Component, OnInit,ViewChild,ElementRef,Renderer,AfterContentInit} from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';

import {Global} from '../../shared/global';
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ElearningPage,ElearningTrainingCategory,ElearningVideo} from '../../api/model/models';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';


@Component({
	templateUrl: 'app/component/elearing/elearing-video-detail.component.html'+environment.fileVersion,
	providers:[ElearningApi],
	directives:[ROUTER_DIRECTIVES]
})
export class ElearingVidoDetailComponent implements OnInit,AfterContentInit {

	@ViewChild("videoplayer") videoplayer: ElementRef;
	imgPrefix:string;
	videoId:string;
	video: ElearningVideo;
	categoryId: string;
	pages: ElearningPage[];
	isVideoShow: boolean;
	detailShow: string;
	videoIndex:number;
	nextPage:ElearningPage;
	prePage:ElearningPage;
	focusType:number;
	traniningCat:ElearningTrainingCategory;
	subjectId:string;
	constructor(private params:RouteParams,private elearingApi: ElearningApi, public global:Global,private renderer:Renderer,private titleService: Title) { 
		this.imgPrefix = global.prefixImg;
		this.subjectId = params.get('subjectId');
		this.categoryId = params.get("categoryId");
		this.videoId = params.get("id");
		this.videoIndex =Number(params.get("index"));
		
		if(!this.videoIndex) {
			this.videoIndex =1;
		}
		this.isVideoShow = true;
		
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
		this.elearingApi.getElearningVideoDetail(this.videoId).toPromise().then((video)=>{
			this.video = video;
			this.titleService.setTitle(this.video.title+this.global.title);
		});

	}

	getElearningTrainingPageNext() {
		if(!this.categoryId) {
			return;
		}


		this.elearingApi.getElearningTrainingPageNext(this.categoryId,this.videoIndex+1).toPromise().then(
			(result) => {
				this.nextPage = result;
			}
		);
	}

	getElearningTrainingPagePre() {
		if(!this.categoryId) {
			return;
		}
		if(this.videoIndex<2) {
			return;
		}
		this.elearingApi.getElearningTrainingPageNext(this.categoryId,this.videoIndex-1).toPromise().then(
			(result) => {
				this.prePage = result;
			}
		);
	}


	focusImportant(type:number){
		this.focusType =type;
		var videoEle = this.videoplayer.nativeElement;

		videoEle.pause();
		this.isVideoShow = false;
		if(type==0){
			videoEle.load();
			this.hidePop();
			videoEle.play();
		}else if(type==1) {
			this.detailShow = this.video.considerations;
		}else if(type==2) {
			this.detailShow = null;
		}else if(type==3){
			this.detailShow = this.video.explanation;
		}else if(type==4){
			this.detailShow = this.video.rule;
		}else{
			this.detailShow = null;
		}
	}

	hidePop(){
		this.isVideoShow = true;
		this.videoplayer.nativeElement.play();
		this.detailShow = null;
		this.focusType = null;
	}

	videoProcess(event){

		var videoEle = this.videoplayer.nativeElement;
		if(event.keyCode==37) {
			videoEle.currentTime-=1/12;	
		}else if(event.keyCode==39) {
			videoEle.currentTime+=1/12;
		}
	}


  	ngOnInit() {
		this.getVideoDetail();	
		this.getElearningTrainingPageNext();
		this.getElearningTrainingPagePre();
  	}
  	ngAfterContentInit(){
  		
  	}

}
