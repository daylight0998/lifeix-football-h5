import { Component,ApplicationRef } from '@angular/core';
import { FootballComponent} from './component/football.component';
import { Router,RouteConfig,ROUTER_DIRECTIVES,ROUTER_PROVIDERS} from '@angular/router-deprecated';
import {HomeComponent} from './component/home';
import {AboutComponent} from './component/about';
import {UserComponent} from './component/user';
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
	{ path: "/about", name: "About", component: AboutComponent }
])
export class AppComponent {

}
