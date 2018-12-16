import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MainComponent } from './main/main.component';
import { BlurbComponent } from './blurb/blurb.component';


const routes: Routes = [
  {
    path: '',
    component: BlurbComponent
  },
  {
    path: 'main',
    component: MainComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
