import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
  moduleId: module.id,
  selector: 'app-elearning',
  templateUrl: 'elearning.component.html',
  styleUrls: ['elearning.component.css']
})
export class ElearningComponent implements OnInit {

  constructor(private titleService:Title,public global: Global) {
  }

  ngOnInit() {
    this.titleService.setTitle("培训"+this.global.title);
  }

}
