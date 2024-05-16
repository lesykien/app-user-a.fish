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

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder,
    private _router: ActivatedRoute,
    private loginService: LoginService,
    private router: Router,
    private ngZone: NgZone,
    private cartService: CartService
  ) { }
  // login by user-name 
  LoginByUserName = this._formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  // login by user-name

  // show button loading
  buttonLoading: any = true
  // alter error on view html
  hasError: boolean = false
  type!: string;
  // show password
  hasPassword: boolean = false;
  iconButotn: boolean = false;
  tileButtonShowPassword: string = 'Hiển thị mật khẩu';
  ngOnInit(): void {
    this.type = this._router.snapshot.params['type'];
    google.accounts.id.initialize({
      client_id: '466166882774-7tso04lmusd37v562kgcccjdmt1schra.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });
    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
      shape: 'rectangular',
      width: 400,
      height: 200,
      logo_alignment: 'center',
      longtitle: true,
      text: 'continue_with'
    });
  }
  Sumbit_Form() {
    this.buttonLoading = false;
    const request: loginRequest = this.LoginByUserName.value as loginRequest;

    this.loginService.loginWithUserName(request).subscribe(
      (response) => {
        let id: string = response.code.toString();
        sessionStorage.setItem('idUser', id)
        this.AddIdUser(response.code);
      }
    )
  }

  // add id khi login xong

  AddIdUser(id: number) {
    const local = localStorage.getItem('cart');
    if (!local) {
      return;
    }
    let listItem: cartLocal[] = JSON.parse(local);

    const localById = localStorage.getItem(`cart${id}`);
    if (!localById) {
      localStorage.setItem(`cart${id}`, JSON.stringify(listItem));
    }
    else {
      let listItemById: cartLocal[] = JSON.parse(localById);
      if (listItemById.length == 0) {
        localStorage.setItem(`cart${id}`, JSON.stringify(listItem));
      }
    }
  }
  // add id khi login xong


  // login with google
  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(response: any) {
    if (!response) return;
    // using ngZone when change page 
    // this.ngZone.run(() => {
    // });
    const payLoad = this.decodeToken(response.credential);
    sessionStorage.setItem('tokenLogin', JSON.stringify(payLoad));
    // this.router.navigate(['/']);
    // window.location.reload();
  }
}