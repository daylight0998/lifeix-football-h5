import { Component, OnInit } from '@angular/core';
import {environment} from '../../environment';

@Component({
  templateUrl: 'app/component/about/about.component.html'+environment.fileVersion
})
export class AboutComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
