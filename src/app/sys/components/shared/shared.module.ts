import { NgModule } from '@angular/core';
 import { CommonModule } from '@angular/common';
 import { RouterModule } from '@angular/router';

 import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ToggleFullscreenDirective } from './directives/toggle-fullscreen.directive';

import {HttpClient, HttpClientModule} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {CheckPermissionDirective} from '../../directives/check-permission.directive';
import { AmazingTimePickerModule } from 'amazing-time-picker';
// import {FileuploadComponent} from './fileupload/fileupload.component';
// import {FileUploadModule} from 'ng2-file-upload';

export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, '../../assets/i18n/', '.json');
}

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ToggleFullscreenDirective,
        NgbModule,
        // FileUploadModule,
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        AmazingTimePickerModule
        // FileUploadModule,
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        SidebarComponent,
        ToggleFullscreenDirective,
        // CheckPermissionDirective,
        // FileuploadComponent
      ]
})
export class SharedModule { }
