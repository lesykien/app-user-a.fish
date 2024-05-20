import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainHomeComponent } from './main-home/main-home.component';
import { HomeComponent } from './home.component';
import { ShopComponent } from './shop/shop.component';
import { UserOrderComponent } from './user-order/user-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AccountComponent } from './account/account.component';
const _router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainHomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'user-order', component: UserOrderComponent },
      { path: 'my-page', component: AccountComponent },
    ]
  }
]

@NgModule({
  declarations: [
    MainHomeComponent,
    ShopComponent,
    UserOrderComponent,
    AccountComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(_router)
  ]
})
export class HomeModule { }
