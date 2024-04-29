import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { HomeModule } from './component/home/home.module';

const routes: Routes = [
  {  path : '' , component : HomeModule},
  {  path : 'login/:type' , component : LoginComponent},
  {  path : 'sign-up' , component : SignUpComponent},
  {  path : 'forget-password' , component : ForgetPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
