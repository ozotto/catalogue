
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

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

@NgModule({
  imports: [
    CommonModule,
    EvLivreRoutingModule,
    FormsModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    FileUploadModule,
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
  ]
})
export class EvLivreModule {}
