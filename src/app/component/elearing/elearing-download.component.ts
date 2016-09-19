import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import {ElearningApi} from '../../api/ElearningApi';
import {ElearningMaterial} from '../../api/model/models';
import {Global} from '../../shared/global';
import { RouteParams, ROUTER_DIRECTIVES} from '@angular/router-deprecated';
import {environment} from '../../environment';
import {Title} from '@angular/platform-browser';

@Component({
	templateUrl: 'app/component/elearing/elearing-download.component.html'+environment.fileVersion,
	providers: [ElearningApi],
	directives: [ROUTER_DIRECTIVES]
})
export class ElearingDownloadComponent implements OnInit {

	imgPrefix: string;
	materialList:ElearningMaterial[] = [];
	currId:string;
	pageSize:number =30;
	totalNum:number =0;
	start:number;
	@ViewChild("loadMore") moreEle:ElementRef;
	loading:boolean = false;
	loadMoreFlag:boolean = true;

	constructor(private params: RouteParams, private elearingApi: ElearningApi, public global: Global,private titleService: Title) {
		this.imgPrefix = global.prefixImg;
		this.titleService.setTitle("资料下载"+global.title);
	}

	getElearningMaterials(start:number){
		this.loading = true;
		this.elearingApi.getElearningMaterials(start,this.pageSize).toPromise().then((data)=>{
			data.forEach((v,i)=>{

				if(v.url.endsWith('.mp3')) {
					v.type = 'mp3';
				}else if(v.url.endsWith('.pdf')) {
					v.type = 'pdf';
				}
				this.materialList.push(v);
				if(i==data.length-1) {
					this.start = i;
				}
			})
			if(data.length<this.pageSize) {
				this.loadMoreFlag = false;
			}
			this.loading = false;
		});
	}

	audioShow(id){
		if(id == this.currId){
			return 'block';
		}else {
			return 'none';
		}
	}

	playAudio(id){
		var audio = new ViewChild('audio_'+id);
		var a = document.getElementById('audio_'+id) as HTMLAudioElement;
		if (this.currId ==id){
			this.currId = null;
			a.pause();
		}else{
			if(this.currId) {
				var currAudio = document.getElementById('audio_'+this.currId) as HTMLAudioElement;
				currAudio.pause();
			}
			this.currId = id;
			a.play();
		} 
	}

	onScroll(e){
		if(!this.loadMoreFlag) {
			return;
		}

		// if(this.materialList.length>=this.totalNum) {
		// 	return;
		// }
		if(this.loading) {
			return;
		}
		var clientHeight = document.documentElement.clientHeight;
		var scrollTop = window.scrollY;
		var videoMoreTop = this.moreEle.nativeElement.offsetTop;
		if((clientHeight+scrollTop+200+40)>=videoMoreTop) {
			this.loadMore();
		}
	}

	loadMore(){
		//this.start +=this.pageSize;
		this.getElearningMaterials(this.start);
	}

	ngOnInit() {
		this.getElearningMaterials(this.start);
	}

}
