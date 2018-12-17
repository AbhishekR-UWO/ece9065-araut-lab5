import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bootstrap 
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { BlurbComponent } from './blurb/blurb.component';
import { AdminItemFunComponent } from './admin-item-fun/admin-item-fun.component';
import { AdminMainFunComponent } from './admin-main-fun/admin-main-fun.component';

@NgModule({
  declarations: [MainComponent, BlurbComponent, AdminItemFunComponent, AdminMainFunComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class HomeModule { }
