import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
  moduleId: module.id,
  selector: 'app-coach',
  templateUrl: 'coach.component.html'+ environment.fileVersion,
  styleUrls: ['coach.component.css']
})
export class CoachComponent implements OnInit {

  constructor(private titleService:Title,public global: Global) {
  }

  ngOnInit() {
    this.titleService.setTitle("教练"+this.global.title);
  }

}

