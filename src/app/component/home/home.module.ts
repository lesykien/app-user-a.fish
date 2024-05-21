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


import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserComponent } from '../user/user.component';

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
    UserComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(_router)
  ]
})
export class HomeModule { }
