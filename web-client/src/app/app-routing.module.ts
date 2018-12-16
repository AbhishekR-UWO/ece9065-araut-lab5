import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppContainerComponent } from './layout/app-layout/app-container/app-container.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppContainerComponent,
    children : [
      {
        path: '',
        redirectTo: '/home', pathMatch: 'full'
      },
      {
        path: 'home',
        loadChildren: './modules/home/home.module#HomeModule'
      }
      ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: './modules/auth/auth.module#AuthModule'
      }
      ]
  },
  {
    path: '**',
    redirectTo: '/home', pathMatch: 'full'
  }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
