import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {ElearningTrainingCategory} from '../../api/model/ElearningTrainingCategory';
import {Global} from '../../shared/global';
import { RouteConfig, RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {ElearningPage,ElearningVideo} from '../../api/model/models';
import {environment} from '../../environment';

@Component({
	templateUrl: 'app/component/elearing/elearing-text-list.component.html'+environment.fileVersion,
	providers:[ElearningApi],
	directives: [ROUTER_DIRECTIVES]
})
export class ElearingTextListComponent extends Global implements OnInit {

	trainingCats: ElearningTrainingCategory[];
	imgPrefix: string;
	categoryId: string;
	selectCatId: string;
	pages: ElearningPage[] =[];
	currVideo:ElearningVideo;
	@ViewChild("videoplayer") videoplayer: ElementRef;
	@ViewChild("loadMore") loadMore:ElementRef;
	@ViewChild("text_directory") textDir:ElementRef;
	
	hideVideo:boolean = true;

	pageSize:number =50;
	start:number =0;
	totalNum:number;
	loading:boolean = false;
	constructor(private params: RouteParams,private elearingApi: ElearningApi, global: Global) { 
		super();
		this.imgPrefix = global.prefixImg;
		this.categoryId = this.params.get("id");
	}

	getTrainingSubCats() {
		this.elearingApi.getElearningTrainingSubCategories(this.categoryId).toPromise().then(
			(cats) => {
				this.trainingCats = cats;
				this.selectCatId = cats[0].id;
				this.totalNum = cats[0].pageCount;
				this.getElearningTrainingPageList(this.selectCatId,0);
			}
		);
	}

	getElearningTrainingPageList(catId: string,start:number) {
		this.loading = true;
		this.elearingApi.getElearningTrainingArticlePageList(catId, start, this.pageSize).toPromise().then(
			(result) => {
				result.forEach((p)=>{
					this.pages.push(p);
				})
				//this.pages.push(result);
				//console.log(this.pages);

				this.loading = false;
			}
		);
	}
  	playVideo(videoId:string){
  		this.currVideo = null;

  		for (var page of this.pages) {
  			if(page.videos) {
  				for (var v of page.videos) {
  					if(v.id == videoId) {
	  					this.currVideo = v;
	  					break;
	  				}
  				}
  			}
  		}
  		this.hideVideo = false;
  	}

  	playAnimation(animation){
  		this.currVideo = {};
  		this.hideVideo = false;
  		this.currVideo.videoPath = animation;
  	}

  	hiddenVideo(){
  		this.hideVideo = true;
  		this.currVideo = null;
  	}


	trainingPage(id){

		this.selectCatId = id;
		for (var cat of this.trainingCats) {
			if(cat.id==id) {
				this.totalNum = cat.pageCount;
			}
		}
		this.pages =[];
		this.start =0;
		console.log( this.textDir);
		window.scrollTo(0,0);
		this.getElearningTrainingPageList(id,0);
		
	}


	moreText(){
		 this.start +=this.pageSize;
		this.getElearningTrainingPageList(this.selectCatId,this.start);
	}

	onScroll(){
		if(this.pages.length>=this.totalNum) {
			return;
		}
		if(this.loading) {
			return;
		}
		var clientHeight = document.documentElement.clientHeight;

		var scrollTop = window.scrollY;

		var videoMoreTop = this.loadMore.nativeElement.offsetTop;
		if((clientHeight+scrollTop+200+40)>=videoMoreTop) {
			this.moreText();
		}
	}

	ngOnInit() {
		this.getTrainingSubCats();
  	}
}
