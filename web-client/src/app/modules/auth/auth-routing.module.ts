import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { UserLoginComponent } from './user-login/user-login.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';

const routes: Routes = [
  {
    path: '',
    component: UserLoginComponent
  },
  {
    path: 'login',
    component: UserLoginComponent
  },
  {
    path: 'register',
    component: UserRegisterComponent
  },
  {
    path: 'admin_login',
    component: AdminLoginComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
