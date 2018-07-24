import {NgModule, NgZone} from '@angular/core';
import { CommonModule }   from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { EvArtgeneveRoutingModule }       from './ev-artgeneve-routing.module';

import { EvArtgeneveComponent }           from './ev-artgeneve.component';
import { ExhibitorsComponent }            from './exhibitors/exhibitors.component';
import { ArtistsComponent }               from './artists/artists.component';
import { ArtworksComponent }              from './artworks/artworks.component';
import { GaleriesComponent }              from './galeries/galeries.component';
import { ExhibitorDetailComponent } from './exhibitors/exhibitor-detail/exhibitor-detail.component';
import {ArtworkDetailComponent} from './artworks/artwork-detail/artwork-detail.component';
import {FileUploadModule} from 'ng2-file-upload';
import {
  DateAdapter,
  MAT_SNACK_BAR_DEFAULT_OPTIONS, MatDatepickerModule, MatFormFieldModule, MatInputModule, MatNativeDateModule,
  MatPaginator,
  MatPaginatorModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule, MAT_DATE_LOCALE, NativeDateAdapter, MAT_DATE_FORMATS, MatAutocompleteModule
} from '@angular/material';
import {SysFileuploadComponent} from '../sys-fileupload/sys-fileupload.component';






//
//
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










@NgModule({
  imports: [
    CommonModule,
    EvArtgeneveRoutingModule,
    FormsModule,
    MatTableModule,
    MatSnackBarModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule,
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
    SysFileuploadComponent,
  ],
  providers: [
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
    // {
    //   provide: DateAdapter, useClass: CustomDateAdapter
    // },
    // {
    //   provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS
    // },
    {provide: MAT_DATE_LOCALE, useValue: 'fr-CH'},
  ]
})
export class EvArtgeneveModule {}
