import { Component,ApplicationRef } from '@angular/core';
import { FootballComponent} from './component/football.component';
import { Router,RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HomeComponent} from './component/home/home.component';
import {UserComponent} from './component/user/user.component';

import {DownloadComponent} from './component/download';
import {RefeerComponent, PlayerMaleComponent, PlayerFeMaleComponent, PlayerDetailComponent, CoachComponent,CoachDetailComponent} from './component/player';
import {DetailComponent} from './component/detail/detail.component';
import {ElearingComponent,ElearingAnimateListComponent,ElearingTextListComponent,ElearingVideoListComponent,ElearingVidoDetailComponent,ElearingDownloadComponent,ElearingAnimateDetailComponent} from './component/elearing';

import {environment} from './environment';

@Component({
  selector: 'cf-content',
  templateUrl: 'app/template/cf-home.html' + environment.fileVersion,
  providers: [ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES, FootballComponent],
})
@RouteConfig([
  {path: "/", name: "Home", component: HomeComponent},
  {path: "/user", name: "User", component: UserComponent},
  {path: "/download", name: "Download", component: DownloadComponent},
  {path: "/training/:id/text", name: "TrainingText", component: ElearingTextListComponent},
  {path: "/news/detail/:id", name: "Detail", component: DetailComponent},
  {path: "/player/detail/:id", name: "PlayDetail", component: PlayerDetailComponent},
  {path: "/coach/detail/:id", name: "CoachDetail", component: CoachDetailComponent},
  {path: "/leader/detail/:id", name: "LeaderDetail", component: CoachDetailComponent},
  {path: "/video/:id", name: "VideoDetail", component: ElearingVidoDetailComponent},
  {path: "/animate/:id", name: "AnimateDetail", component: ElearingAnimateDetailComponent}
])
export class AppComponent {

}
