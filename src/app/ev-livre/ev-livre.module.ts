import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MaterialSharedModule} from '../sys/modules/material-shared.module';

import {EvLivreRoutingModule} from './routes/ev-livre-routing.module';

import {EvLivreComponent} from './ev-livre.component';
import {ExhibitorsComponent} from './components/exhibitors/exhibitors.component';
import {ExhibitorDetailComponent} from './components/exhibitors/exhibitor-detail/exhibitor-detail.component';

@NgModule({
  imports: [
    CommonModule,
    EvLivreRoutingModule,
    FormsModule,
    MaterialSharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    EvLivreComponent,
    ExhibitorsComponent,
    ExhibitorDetailComponent,
  ],
  providers: [
  ]
})
export class EvLivreModule {}
