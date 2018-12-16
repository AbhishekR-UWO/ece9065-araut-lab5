import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Routing module
import { AuthRoutingModule } from './auth-routing.module';

// User auth components
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';

// Admin auth component
import { AdminLoginComponent } from './admin-login/admin-login.component';

// Forms module
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UserLoginComponent, 
    UserRegisterComponent, 
    AdminLoginComponent
    ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule
  ]
})
export class AuthModule { }
