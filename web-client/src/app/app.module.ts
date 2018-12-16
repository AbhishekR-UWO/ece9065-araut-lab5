import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Bootstrap 
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// HTTP, Forms, Toastr Modules
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

// Layout module
import { LayoutModule } from './layout/layout.module';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
    FormsModule,
    LayoutModule,
    HttpClientModule
  ],
  providers: [ToastrService],
  bootstrap: [AppComponent]
})
export class AppModule { }
