import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bootstrap 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { ApiServiceService } from './../../service/api-service.service';
import { StatusService } from './../../service/status.service';

import { HomeRoutingModule } from './home-routing.module';
import { MainComponent } from './main/main.component';
import { BlurbComponent } from './blurb/blurb.component';
import { AdminItemFunComponent } from './admin-item-fun/admin-item-fun.component';
import { AdminMainFunComponent } from './admin-main-fun/admin-main-fun.component';
import { WishComponent } from './wish/wish.component';
import { CartComponent } from './cart/cart.component';


import { FormsModule } from '@angular/forms';
import { WishComponent } from './wish/wish.component';
import { CartComponent } from './cart/cart.component';


@NgModule({
  declarations: [MainComponent, BlurbComponent, AdminItemFunComponent, AdminMainFunComponent, WishComponent, CartComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule
  ],
  providers: [ApiServiceService, StatusService]
})
export class HomeModule { }
