import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
    moduleId: module.id,
    selector: 'app-user',
    templateUrl: 'user.component.html' + environment.fileVersion,
    styleUrls: ['user.component.css']
})
export class UserComponent implements OnInit {

    constructor(private titleService:Title,public global: Global) {
    }

    ngOnInit() {
        this.titleService.setTitle("用户中心"+this.global.title);
    }

}

