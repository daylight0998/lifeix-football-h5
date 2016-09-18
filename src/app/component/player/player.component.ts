import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
  moduleId: module.id,
  selector: 'app-player',
  templateUrl: 'player.component.html',
  styleUrls: ['player.component.css']
})
export class PlayerComponent implements OnInit {

  constructor(private titleService:Title,public global: Global) {
  }

  ngOnInit() {
    this.titleService.setTitle("运动员"+this.global.title);
  }

}
