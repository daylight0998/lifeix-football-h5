import { Component,ApplicationRef } from '@angular/core';
import { FootballComponent} from './component/football.component';
import { Router,RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HomeComponent} from './component/home/home.component';
import {UserComponent} from './component/user/user.component';
import {CoachComponent} from './component/coach/coach.component';
import {CompetitionComponent} from './component/competition/competition.component';
import {PlayerComponent} from './component/player/player.component';
import {WemediaComponent} from './component/wemedia/wemedia.component';
import {ElearningComponent} from './component/elearning/elearning.component';
import {StaffComponent} from './component/staff/staff.component';
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
  {path: "/competition", name: "Competition", component: CompetitionComponent},
  {path: "/player", name: "Player", component: PlayerComponent},
  {path: "/wemedia", name: "Wemedia", component: WemediaComponent},
  {path: "/coach", name: "Coach", component: CoachComponent},
  {path: "/staff", name: "Staff", component: StaffComponent},
  {path: "/elearning", name: "Elearning", component: ElearningComponent}
])
export class AppComponent {

}
