
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { reducer } from './reducers/schedule.reducer';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialSharedModule} from '../sys/modules/material-shared.module';

import {EvLivreRoutingModule} from './routes/ev-livre-routing.module';

import {EvLivreComponent} from './ev-livre.component';
import {ExhibitorsComponent} from './components/exhibitors/exhibitors.component';
import {ExhibitorDetailComponent} from './components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import {CheckPermissionDirective} from '../sys/directives/check-permission.directive';
import {AuthorsComponent} from './components/authors/authors.component';
import {AuthorDetailComponent} from './components/authors/author-detail/author-detail.component';
import {AnimationsComponent} from './components/animations/animations.component';
import {AnimationDetailComponent} from './components/animations/animation-detail/animation-detail.component';
import {AutographsComponent} from './components/autographs/autographs.component';
import {AutographDetailComponent} from './components/autographs/autograph-detail/autograph-detail.component';
import {FileUploadModule} from 'ng2-file-upload';
import {FileuploadComponent} from '../sys/components/shared/fileupload/fileupload.component';

import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';

export const FORMAT_DATE = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@NgModule({
  imports: [
    CommonModule,
    EvLivreRoutingModule,
    FormsModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    FileUploadModule,
    StoreModule.forRoot({
      schedule: reducer
    })
  ],
  declarations: [
    EvLivreComponent,
    ExhibitorsComponent,
    ExhibitorDetailComponent,
    AuthorsComponent,
    AuthorDetailComponent,
    AnimationsComponent,
    AnimationDetailComponent,
    AutographsComponent,
    AutographDetailComponent,
    CheckPermissionDirective,
    FileuploadComponent,
  ],
  providers: [
    //Set format date
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: FORMAT_DATE},
  ]
})
export class EvLivreModule {}
