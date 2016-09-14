import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppComponent, environment } from './app/';
import { HTTP_PROVIDERS } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {provide} from '@angular/core';
import { Title }     from '@angular/platform-browser';

import {Global} from './app/shared/global';

if (environment.production) {
  enableProdMode();
}
bootstrap(AppComponent, [Title,HTTP_PROVIDERS, ROUTER_PROVIDERS,provide(LocationStrategy, {useClass: HashLocationStrategy}), Global]);
window.onpopstate = function(event) {
    //document.location.reload();
    var ua = window.navigator.userAgent;
    if(ua.toLowerCase().match(/version\/([\d.]+).*safari/)) {
    	document.location.reload();
    }
};
//保持页面显示在顶部
window.scrollTo(0,0);

