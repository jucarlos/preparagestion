import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { SubheaderComponent } from './subheader/subheader.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SubheaderComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule
  ],
  exports: [
    HeaderComponent,
    SubheaderComponent
  ]
})
export class SharedModule { }
