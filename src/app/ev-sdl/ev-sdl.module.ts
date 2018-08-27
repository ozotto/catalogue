import {NgModule, NgZone} from '@angular/core';
import {CommonModule}   from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialSharedModule} from '../sys/modules/material-shared.module';

import {EvSdlRoutingModule} from './routes/ev-sdl-routing.module';

import {EvSdlComponent} from './ev-sdl.component';
import {ExhibitorsComponent} from './components/exhibitors/exhibitors.component';
import {AuthorsComponent} from './components/authors/authors.component';
import {AnimationsComponent} from './components/animations/animations.component';
import {ExhibitorDetailComponent} from './components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import {AuthorDetailComponent} from './components/authors/author-detail/author-detail.component';
import {AnimationDetailComponent} from './components/animations/animation-detail/animation-detail.component';
//import {FileUploadModule} from 'ng2-file-upload';
//import {FileuploadComponent} from '../sys/components/shared/fileupload/fileupload.component';

@NgModule({
  imports: [
    CommonModule,
    EvSdlRoutingModule,
    FormsModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    //FileUploadModule,
  ],
  declarations: [
    EvSdlComponent,
    ExhibitorsComponent,
    AuthorsComponent,
    AnimationsComponent,
    ExhibitorDetailComponent,
    AuthorDetailComponent,
    AnimationDetailComponent,
    //FileuploadComponent,
  ],
  providers: [
  ]
})
export class EvSdlModule {}
