import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import {Observable} from 'rxjs';
import {SelectionModel} from '@angular/cdk/collections';


import * as _ from 'lodash';
import {AnimationService} from '../../services/animation.service';
import {PermissionsHelper} from '../../../sys/helpers/permissions.helper';
import {TypeService} from '../../services/type.service';
import {Animation} from '../../models/animation';

@Component({
  selector: 'app-animations',
  providers: [AnimationService],
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss']
})
export class AnimationsComponent implements OnInit {
  displayedColumns: string[];

  dataSource = new MatTableDataSource();
  selection = new SelectionModel(true, []);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public isSuperUser: Boolean;

  constructor( private animationservice: AnimationService, private permissionshelper: PermissionsHelper) {

  }

  ngOnInit() {
    const isSuperUser = this.permissionshelper.showIfSuperUser();
    if (isSuperUser) {
      this.displayedColumns = ['select', 'actions', 'id', 'title', 'location', 'exhibitor'];
    } else {
      this.displayedColumns = ['select', 'actions', 'title', 'location', 'exhibitor'];
    }
    this.getAnimations();
  }

  getAnimations() {
    this.animationservice.getAnimations().subscribe((animations) => {
      this.dataSource.data = animations
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log('animations');
      console.log(animations);
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAnimation(animation: Animation) {
    /* TODO: Afficher message confirmation */
    // this.animations = this.animations.filter(h => h !== animation);
    this.animationservice.deleteAnimation(animation).subscribe();
  }

}

