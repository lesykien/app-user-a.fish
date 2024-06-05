import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { AppAdminComponent } from './component/app-admin/app-admin.component';
import { HomeComponent } from './component/home/home.component';

const routes: Routes = [
  {  path : '' , component : HomeComponent},
  {  path : 'admin' , component : AppAdminComponent},
  {  path : 'login/:type' , component : LoginComponent},
  {  path : 'sign-up' , component : SignUpComponent},
  {  path : 'forget-password' , component : ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
