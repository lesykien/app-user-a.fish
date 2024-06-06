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
import { ProductHomeComponent } from './product-home/product-home.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogDetalComponent } from './blog-detal/blog-detal.component';
import { ByNowComponent } from './by-now/by-now.component';
import { ThankYouComponent } from './thank-you/thank-you.component';
const _router: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: MainHomeComponent },
      { path: 'shop', component: ShopComponent },
      { path: 'shop/:search', component: ShopComponent },
      { path: 'user-order', component: UserOrderComponent },
      { path: 'my-page', component: AccountComponent },
      { path: 'product-home/:id', component: ProductHomeComponent },
      { path: 'blogs', component: BlogsComponent },
      { path: 'blog-detal/:id', component: BlogDetalComponent },
      { path: 'by-now/:id', component: ByNowComponent },
      { path: 'thank-you/:id', component: ThankYouComponent },
    ],
  },
];

@NgModule({
  declarations: [
    MainHomeComponent,
    ShopComponent,
    UserOrderComponent,
    AccountComponent,
    UserComponent,
    ProductHomeComponent,
    BlogsComponent,
    BlogDetalComponent,
    ByNowComponent,
    ThankYouComponent,
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
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forChild(_router),
  ],
})
export class HomeModule {}
