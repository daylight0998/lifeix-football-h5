import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
  moduleId: module.id,
  selector: 'app-wemedia',
  templateUrl: 'wemedia.component.html',
  styleUrls: ['wemedia.component.css']
})
export class WemediaComponent implements OnInit {

  constructor(private titleService:Title,public global: Global) {
  }

  ngOnInit() {
    this.titleService.setTitle("资讯"+this.global.title);
  }

}
