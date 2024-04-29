import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { HomeComponent } from './home.component';
import { ShopComponent } from './shop/shop.component';

const _router: Routes = [
  { 
    path: 'home', 
    component: HomeComponent,
    children : [
      {path : '' , component: MainHomeComponent},
      {path : 'shop' , component: ShopComponent},
    ]
  }
]

@NgModule({
  declarations: [
    MainHomeComponent,
    ShopComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(_router)
  ]
})
export class HomeModule { }
