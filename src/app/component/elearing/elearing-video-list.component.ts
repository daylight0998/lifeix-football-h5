import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {ElearningTrainingCategory,ElearningPage} from '../../api/model/models';
import {Global} from '../../shared/global';
import {RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';


@Component({
	templateUrl: 'app/component/elearing/elearing-video-list.component.html'+environment.fileVersion,
	providers: [ElearningApi],
	directives: [ROUTER_DIRECTIVES]
})
export class ElearingVideoListComponent implements OnInit {

	@ViewChild("videoMore") vidroMore:ElementRef;
	trainingCats: ElearningTrainingCategory[];
	imgPrefix: string;
	categoryId: string;
	selectCatId: string;//subCategoryId
	pages: ElearningPage[]=[];
	pageSize:number =30;
	totalNum:number =0;
	start:number =0;

	loading:boolean = false;

	constructor(private params: RouteParams, private elearingApi: ElearningApi, public global: Global,private titleService: Title) {
		this.imgPrefix = global.prefixImg;
		this.categoryId = this.params.get("id");
		this.selectCatId = this.params.get("category");
		this.titleService.setTitle("教学培训列表"+global.title)
	}

	getTrainingSubCats() {

		this.elearingApi.getElearningTrainingSubCategories(this.categoryId).toPromise().then(
			(cats) => {
				this.trainingCats = cats;
				this.global.trainingCats =  cats;
				if (this.trainingCats && this.trainingCats.length>0) {
					if(this.selectCatId) {
						for (var cat of this.trainingCats) {
							if(cat.id == this.selectCatId) {
								this.totalNum = cat.pageCount;
							}
						}
					}else{
						this.selectCatId = cats[0].id;
						this.totalNum = cats[0].pageCount;
					}

					this.getElearningTrainingPageList(this.selectCatId,this.start);
				}
			}
		);
	}

	getElearningTrainingPageList(catId: string,start:number) {

		this.loading = true;

		this.elearingApi.getElearningTrainingPageList(catId, start, this.pageSize).toPromise().then(
			(result) => {
				result.forEach((p)=>{
					this.pages.push(p);
				})
				this.loading = false;
			}
		);
	}

	getVideoPage(id){
		this.selectCatId = id;
		this.start = 0;
		for (var cat of this.trainingCats) {
			if(cat.id == id) {
				this.totalNum = cat.pageCount;
				break;
			}
		}
		this.pages =[];
		this.getElearningTrainingPageList(id,this.start);
		
	}

	moreVideo(){
		this.start +=this.pageSize;
		this.getElearningTrainingPageList(this.selectCatId,this.start);
	}

	onScroll(e,ele){
		if(this.pages.length>=this.totalNum) {
			return;
		}
		if(this.loading) {
			return;
		}
		var clientHeight = document.documentElement.clientHeight;

		var scrollTop = window.scrollY;

		var videoMoreTop = this.vidroMore.nativeElement.offsetTop;

		//console.log(clientHeight+"++"+scrollTop+"=="+videoMoreTop);

		//console.log(e.target +"---"+document.documentElement+"=="+window+"--"+window.scrollY+"=="+window.screenTop+"=="+window.screenX+"a"+window.screenY);
		//console.log(this.vidroMore);
		if((clientHeight+scrollTop+200+40)>=videoMoreTop) {
			this.moreVideo();
		}
	}


	ngOnInit() {
		this.getTrainingSubCats();
		//this.getElearningTrainingPageList();
	}



}
