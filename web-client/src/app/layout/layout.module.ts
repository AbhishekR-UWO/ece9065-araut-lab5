import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

// Bootstrap for Stylesheets
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// Import layouts and components
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
import { AppContainerComponent } from './app-layout/app-container/app-container.component';
import { AppContentComponent } from './app-layout/app-content/app-content.component';
import { AppHeaderComponent } from './app-layout/app-header/app-header.component';
import { AppFooterComponent } from './app-layout/app-footer/app-footer.component';

// Router for routing between the layout
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AuthLayoutComponent, 
    AppContainerComponent, 
    AppContentComponent, 
    AppHeaderComponent, 
    AppFooterComponent
    ],
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
    RouterModule
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class LayoutModule { }
