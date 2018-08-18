import { NgModule } from '@angular/core';
import { 
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
