import { Component, OnInit } from '@angular/core';
import { DomSanitizationService,SafeHtml,SafeScript,Title} from '@angular/platform-browser';
import {environment} from '../../environment';
import {Global}from '../../shared/global';

@Component({
  moduleId: module.id,
  selector: 'app-staff',
  templateUrl: 'staff.component.html',
  styleUrls: ['staff.component.css']
})
export class StaffComponent implements OnInit {

  constructor(private titleService:Title,public global: Global) {
  }

  ngOnInit() {
    this.titleService.setTitle("队员"+this.global.title);
  }

}
