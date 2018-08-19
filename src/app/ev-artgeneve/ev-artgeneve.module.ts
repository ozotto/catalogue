import {NgModule, NgZone} from '@angular/core';
import {CommonModule}   from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {FileUploadModule} from 'ng2-file-upload';
import {FileuploadComponent} from '../sys/components/fileupload/fileupload.component';

import {MaterialSharedModule} from '../sys/modules/material-shared.module';

import {EvArtgeneveRoutingModule} from './routes/ev-artgeneve-routing.module';

import {EvArtgeneveComponent} from './ev-artgeneve.component';
import {ExhibitorsComponent} from './components/exhibitors/exhibitors.component';
import {ArtistsComponent} from './components/artists/artists.component';
import {ArtworksComponent} from './components/artworks/artworks.component';
import {GaleriesComponent} from './components/galeries/galeries.component';
import {ExhibitorDetailComponent} from './components/exhibitors/exhibitor-detail/exhibitor-detail.component';
import {ArtworkDetailComponent} from './components/artworks/artwork-detail/artwork-detail.component';
import {ArtistDetailComponent} from './components/artists/artist-detail/artist-detail.component';
import {GalleryDetailComponent} from './components/galeries/gallery-detail/gallery-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EvArtgeneveRoutingModule,
    FormsModule,
    MaterialSharedModule,
    ReactiveFormsModule,
    FileUploadModule,
  ],
  declarations: [
    EvArtgeneveComponent,
    ExhibitorsComponent,
    ArtistsComponent,
    ArtworksComponent,
    GaleriesComponent,
    ExhibitorDetailComponent,
    ArtworkDetailComponent,
    FileuploadComponent,
    ArtistDetailComponent,
    GalleryDetailComponent,
  ],
  providers: [
  ]
})
export class EvArtgeneveModule {}


//providers: [
    //{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    
    // {
    //   provide: DateAdapter, useClass: CustomDateAdapter
    // },
    // {
    //   provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    // },
    //{provide: MAT_DATE_LOCALE, useValue: 'fr-CH'},
  //]

// // extend NativeDateAdapter's format method to specify the date format.
// export class CustomDateAdapter extends NativeDateAdapter {
//   format(date: Date, displayFormat: Object): string {
//     if (displayFormat === 'input') {
//       const day = date.getUTCDate();
//       const month = date.getUTCMonth() + 1;
//       const year = date.getFullYear();
//       // Return the format as per your requirement
//       return `${year}-${month}-${day}`;
//     } else {
//       return date.toDateString();
//     }
//   }
//
//   // If required extend other NativeDateAdapter methods.
// }
//
// const MY_DATE_FORMATS = {
//   parse: {
//     dateInput: 'YYYY-MM-DD',
//   },
//   display: {
//     dateInput: 'input',
//     monthYearLabel: {year: 'numeric', month: 'short'},
//     dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
//     monthYearA11yLabel: {year: 'numeric', month: 'long'},
//   }
// };

