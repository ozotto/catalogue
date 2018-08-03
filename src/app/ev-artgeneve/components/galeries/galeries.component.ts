import { Component, OnInit } from '@angular/core';

import { LocalDataSource } from 'ng2-smart-table';
import * as tableData from '../data/data-gallery';

@Component({
  selector: 'app-galeries',
  templateUrl: './galeries.component.html',
  styleUrls: ['./galeries.component.scss']
})
export class GaleriesComponent implements OnInit {

	source: LocalDataSource;

  constructor() { 
  	this.source = new LocalDataSource(tableData.data);
  }

  settings = tableData.settings;

  ngOnInit() {
  }

}
