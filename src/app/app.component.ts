import { Component,ApplicationRef } from '@angular/core';
import { FootballComponent} from './component/football.component';
import { Router,RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HomeComponent} from './component/home';
import {AboutComponent} from './component/about';
import {UserComponent} from './component/user';
import {DownloadComponent} from './component/download';
import {RefeerComponent, PlayerMaleComponent, PlayerFeMaleComponent, PlayerDetailComponent, CoachComponent,CoachDetailComponent} from './component/player';
import {DetailComponent} from './component/detail';
import {YongComponent} from './component/yong';
//import {Top12Component,Top12MatchComponent,Top12ScoreboardComponent} from './component/event/top12';
import {EtestComponent,EtestStartComponent,EtestPreComponent} from './component/etest';
import {ElearingComponent,ElearingAnimateListComponent,ElearingTextListComponent,ElearingVideoListComponent,ElearingVidoDetailComponent,ElearingDownloadComponent,ElearingAnimateDetailComponent} from './component/elearing';
import {environment} from './environment';

@Component({
  selector: 'cf-content',
  templateUrl: 'app/template/cf-home.html'+environment.fileVersion,
  providers:[ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES,FootballComponent],
})
@RouteConfig([
	{ path: "/", name: "Home", component: HomeComponent },
	{ path: "/user", name: "User", component: UserComponent },
	{ path: "/about", name: "About", component: AboutComponent },
	{ path: "/download", name: "Download", component: DownloadComponent },
	{ path: "/player/female", name: "CN-Woman-Player", component: PlayerFeMaleComponent },
	{ path: "/player/male", name: "CN-Man-Player", component: PlayerMaleComponent },
	{ path: "/coach", name: "Coach", component: CoachComponent },
	{ path: "/referee", name: "Refeer", component: RefeerComponent },
	{ path: "/youth", name: "CN-Youth-Player", component: YongComponent },
	{path:"/news/detail/:id",name:"Detail",component:DetailComponent},
	//{ path: "/top12", name: "Top12", component: Top12Component },
	//{ path: "/top12/scoreboard", name: "Scoreboard", component: Top12ScoreboardComponent },
	//{ path: "/top12/match/:id", name: "Match12", component: Top12MatchComponent },
	{ path: "/quiz", name: "Quiz", component: EtestComponent },
	{ path: "/training", name: "Training", component: ElearingComponent },
	{ path: "/training/:id/videos", name: "TrainingVideo", component: ElearingVideoListComponent },
	{ path: "/training/:id/animates", name: "TrainingAnimate", component: ElearingAnimateListComponent },
	{ path: "/training/:id/text", name: "TrainingText", component: ElearingTextListComponent },
	{ path: "/training/download", name: "TrainingDownload", component: ElearingDownloadComponent },
	{ path: "/player/detail/:id", name: "PlayDetail", component: PlayerDetailComponent },
	{ path: "/coach/detail/:id", name: "CoachDetail", component: CoachDetailComponent },
	{ path: "/leader/detail/:id", name: "LeaderDetail", component: CoachDetailComponent },
	{ path: "/video/:id", name: "VideoDetail", component: ElearingVidoDetailComponent},
		{ path: "/animate/:id", name: "AnimateDetail", component: ElearingAnimateDetailComponent},
	{ path: "/quiz/:id", name: "QuizStart", component: EtestStartComponent },{ path: "/prequiz/:id", name: "QuizPre", component: EtestPreComponent }
])
export class AppComponent {

	// constructor(catApi: CategoryApi) {
	// 	catApi.getCategoryList().toPromise().then((cs)=>{console.log(cs[0])});
	// 	console.log( + "======");

	// }
	// constructor(_router:Router,
	//             _applicationRef: ApplicationRef) {
	//     _router.subscribe((uri)=> {
	//        // if (Object.prototype.toString.call(wi).indexOf('Constructor') > 0) {
	//             // We appear to be using Safari...
	//             _applicationRef.zone.run(() => _applicationRef.tick());
	//        // }
	//     });
	// }



}
