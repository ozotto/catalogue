import { Component, OnInit } from '@angular/core';
import { Exhibitor } from './exhibitor';
import { ExhibitorService } from '../services/exhibitor.service';

@Component({
  selector: 'app-exhibitors',
  templateUrl: './exhibitors.component.html',
  styleUrls: ['./exhibitors.component.scss']
})
export class ExhibitorsComponent implements OnInit {

	exhibitors: Exhibitor[];

  constructor(private exhibitorService: ExhibitorService) { }

  ngOnInit() {
    this.getExhibitors();
  }

  getExhibitors(): void {
    this.exhibitorService.getExhibitors()
        .subscribe(exhibitors => this.exhibitors = exhibitors);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.exhibitorService.addExhibitor({ name } as Exhibitor)
      .subscribe(exhibitor => {
        this.exhibitors.push(exhibitor);
      });
  }
 
  delete(exhibitor: Exhibitor): void {
    this.exhibitors = this.exhibitors.filter(h => h !== exhibitor);
    this.exhibitorService.deleteExhibitor(exhibitor).subscribe();
  }

}
