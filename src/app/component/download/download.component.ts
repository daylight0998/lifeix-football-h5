import { Component, OnInit } from '@angular/core';
import {environment} from '../../environment';

@Component({
  templateUrl: 'app/component/download/download.component.html'+environment.fileVersion
})
export class DownloadComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
