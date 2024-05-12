import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppAdminComponent } from './app-admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminBlogComponent } from './admin-blog/admin-blog.component';
import { AdminHistoryOrderComponent } from './admin-history-order/admin-history-order.component';
import { AdminCheckerOrderComponent } from './admin-checker-order/admin-checker-order.component';
import { AdminShippingOrderComponent } from './admin-shipping-order/admin-shipping-order.component';
import { AddProductComponent } from './add-product/add-product.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

const _router: Routes = [
  { 
    path: 'admin', component: AppAdminComponent,
    children: [
      { path: 'product', component: AdminHomeComponent },
      { path: 'product/:id', component: AdminHomeComponent },
      { path: 'blog', component: AdminBlogComponent },
      { path: 'checker', component: AdminCheckerOrderComponent },
      { path: 'history', component: AdminHistoryOrderComponent },
      { path: 'delivery', component: AdminShippingOrderComponent },
    ]
  }
]

@NgModule({
  declarations: [
    AdminHomeComponent,
    AdminBlogComponent,
    AdminHistoryOrderComponent,
    AdminCheckerOrderComponent,
    AdminShippingOrderComponent,
    AddProductComponent, 
    EditProductComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    RouterModule.forChild(_router)
  ]
})
export class AppAdminModule { }
