import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { MainComponent } from './main/main.component';
import { BlurbComponent } from './blurb/blurb.component';
import { AdminItemFunComponent } from './admin-item-fun/admin-item-fun.component';
import { AdminMainFunComponent } from './admin-main-fun/admin-main-fun.component';



const routes: Routes = [
  {
    path: '',
    component: BlurbComponent
  },
  {
    path: 'main',
    component: MainComponent
  },
  {
    path: 'admin/item_fun',
    component: AdminItemFunComponent
  },
  {
    path: 'admin/main_fun',
    component: AdminMainFunComponent
  },
  {
    path: 'wish',
    component: WishComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
