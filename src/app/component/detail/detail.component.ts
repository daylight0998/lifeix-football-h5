import { Component, OnInit,AfterViewInit,AfterContentInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import { RouteParams } from '@angular/router-deprecated';
import {Post,Like} from '../../api/model/models';
import {PostApi} from '../../api/PostApi';
import {LikesApi} from '../../api/LikesApi';
import {DateFormatPipe} from '../../utils/date-format-pipe';
import {environment} from '../../environment';
import {Global}from '../../shared/global';


@Component({
  //selector: 'app-detail',
	templateUrl: 'app/component/detail/detail.component.html'+environment.fileVersion,
	providers:[PostApi,LikesApi],
	pipes:[DateFormatPipe]
  //styleUrls: ['detail.component.css']
})
//@Pipe({ name: "date", pure: false })
export class DetailComponent implements OnInit,AfterViewInit,AfterContentInit {
	private likeType:string ="post";
	post: Post;
	postId: string;
	like:Like;
	//private animator: AnimationBuilder;
	postContent:SafeHtml ;
	weixinHiddenFlag:boolean = true;
	weixinQRurl:string;


	constructor(private likesApi:LikesApi,private postApi:PostApi,private routeParams: RouteParams,private domService: DomSanitizationService,private titleService: Title,public global: Global) {
		this.postId=routeParams.get('id');
	}


	postDetail(id:string){
		this.postApi.getPostDetail(id).toPromise().then((post)=>{
			this.post = post;
			this.postContent = this.domService.bypassSecurityTrustHtml(this.post.content);

			//for SEO
			this.titleService.setTitle(this.post.title+this.global.title);
		});
	}

	getLikes(){
		this.likesApi.getTagetLikeds(this.postId,"post").toPromise().then((data)=>{
			this.like = data;
		});

	}

	getQR(link:string){
		this.postApi.getPostQR(link).toPromise().then((data)=>{
			//console.log(data);
			this.weixinQRurl =  data.url;
			//console.log(this.weixinQRurl );

		});
	}

	addLike(e,like:boolean){
		if(this.like.like) {
			return ;
		}
		this.likesApi.addLike(this.likeType,this.postId,like).toPromise().then((data)=>{
			if(like) {
				this.like.likeNum +=1;
				//this.animator.setType("pulse").setDuration(1000).show(e.target);
			}else{
				this.like.unlikeNum +=1;
			}

			this.like.like = data.like;
		});
	}



	share(type:string,post){
		var localUrl =window.location.href;
		var url ="";
		switch (type) {
			case "qzone":
			url = "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url="+localUrl+"&site=中国足球网&pics="+post.image+"&summary="+post.title+"&desc=&title="+post.title+"&showcount=0&otype=share";
				break;
			case "sina":
				url ="http://service.weibo.com/share/share.php?appkey=4138999571&url="+localUrl+"&title="+post.title+"&pic="+post.image+"&searchPic=false"
				break;
			case "fbook":
				url = "http://www.facebook.com/sharer.php?u="+localUrl+"&t="+post.title;
				break;
			case "twi":
				url = "http://twitter.com/home/?status="+post.title+" "+localUrl;
				break;
			case "weixin":
				this.weixinHiddenFlag = false;
				//this.getQR(localUrl);
				break;
			default:
				break;
		}
		//console.log(url);
		return url;
	}

	hiddenPop(){
		this.weixinHiddenFlag = true;
	}

  	ngOnInit() {
	  this.postDetail(this.postId);
	  this.getLikes();
	  this.getQR(window.location.href)
  	}

  	ngAfterContentInit(){
	}

  	ngAfterViewInit(){
  		//console.log(this.post);
  	// 	var ss = document.getElementById("qr_script_s");
  	// 	var sq = document.getElementById("qr_script_q");
  	// 	if(ss) {
  	// 		ss.parentNode.removeChild(ss);
  	// 	}
  	// 	if(sq) {
  	// 		sq.parentNode.removeChild(sq);
  	// 	}

  	// 	var s = document.createElement("script");
		 //  s.type = "text/javascript";
		 //  s.src = "http://cdn.bootcss.com/jquery.qrcode/1.0/jquery.qrcode.min.js";
		 //  s.id ="qr_script_s";

		 //  s.onload= function(){
		 //  	var q = document.createElement("script");
			// q.type = "text/javascript";
			// q.setAttribute("defer","defer");
			// q.id="qr_script_q";
			// q.innerHTML='jQuery("#detail_qrcode").qrcode("'+document.location.href+'");';
			// //q.innerHTML='new QRCode(document.getElementById("detail_qrcode"), "'+document.location.href+'");';
			// document.body.appendChild(q);
		 //  };

		 //  document.body.appendChild(s);
  	}


}
