declare var google: any;
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginRequest } from '../../model/login.model';
import { LoginService } from '../../service/login.service';
import { LoginGeneral } from '../../involvement/login.involvement';
import { JsonPipe } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { cartLocal } from '../../model/cart.model';
import { _cart } from '../../involvement/cart.involvement';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _router: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private accountService: AccountService,
    private ngZone: NgZone,
    private cartService: CartService
  ) {}
  // login by user-name
  LoginByUserName = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  isUserName: boolean = false;
  isPassword: boolean = false;
  // login by user-name

  ngOnInit(): void {
    this.LoginByGoogle();  
  }

  LoginByGoogle() {
    google.accounts.id.initialize({
      client_id:
        '466166882774-7tso04lmusd37v562kgcccjdmt1schra.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp),
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      width: 400,
      height: 200,
      logo_alignment: 'center',
      longtitle: true,
      text: 'continue_with',
    });
  }

  Sumbit_Form() {
    const request: loginRequest = this.LoginByUserName.value as loginRequest;
    this.loginService.loginWithUserName(request).subscribe((response) => {
      let id: string = response.code.toString();
      if (response.code == 500) {
        this.isUserName = true;
        return;
      }

      if (response.code == 501) {
        this.isUserName = false;
        this.isPassword = true;
        return;
      }

      sessionStorage.setItem('idUser', id);
      if (Boolean(response.message) == true) {
        window.location.reload();
        return;
      }
      window.location.reload();
    });
  }

  // login with google
  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(response: any) {
    if (!response) return;
    const payLoad = this.decodeToken(response.credential);
    sessionStorage.setItem('tokenLogin', JSON.stringify(payLoad));
    window.location.reload();
  }
}
