import { NgModule } from '@angular/core';
import { 
  MatButtonModule,
  MatTableModule, 
  MatFormFieldModule, 
  MatPaginatorModule, 
  MatInputModule, 
  MatProgressSpinnerModule, 
  MatSortModule, 
  MatCheckboxModule, 
  MatAutocompleteModule, 
  MatSelectModule
} from '@angular/material';

@NgModule({
  imports:[
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
  exports:[
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatSelectModule,
  ],
})
export class MaterialSharedModule { }
