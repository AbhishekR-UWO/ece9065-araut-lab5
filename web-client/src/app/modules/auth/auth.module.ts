import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bootstrap 
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ToastrModule } from 'ngx-toastr';

// Routing module
import { AuthRoutingModule } from './auth-routing.module';

// User auth components
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

// Admin auth component
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Http
import { HttpClientModule } from '@angular/common/http';
// Forms module
import { FormsModule } from '@angular/forms';

// API Services
import { ApiServiceService } from './../../service/api-service.service';
import { StatusService } from './../../service/status.service'

@NgModule({
  declarations: [
    UserLoginComponent, 
    UserRegisterComponent, 
    AdminLoginComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [ApiServiceService, StatusService]
})
export class AuthModule { }
