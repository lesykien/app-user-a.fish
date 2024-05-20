import { NgModule, importProvidersFrom } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ForgetPasswordComponent } from './component/forget-password/forget-password.component';
import { HomeComponent } from './component/home/home.component';
import { HomeModule } from './component/home/home.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppAdminComponent } from './component/app-admin/app-admin.component';
import { AppAdminModule } from './component/app-admin/app-admin.module';
import { CartComponent } from './component/cart/cart.component';
import { EditorModule } from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    ForgetPasswordComponent,
    HomeComponent,
    AppAdminComponent, 
    CartComponent,
  ],
  imports: [
    BrowserModule,
    HomeModule,
    AppAdminModule,
    AppRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    EditorModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(), 
    importProvidersFrom(HttpClientModule),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
