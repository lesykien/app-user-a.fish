declare var google: any;
import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginRequest } from '../../model/login-request.model';
import { LoginService } from '../../service/login.service';
import { LoginGeneral } from '../../involvement/login.involvement';

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
    private ngZone: NgZone
  ) { }
  // login by email 
  LoginByEmail = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })
  // login by email 

  // login by phone 
  LoginByPhone = this._formBuilder.group({
    phone: ['',
      [
        Validators.required,
        Validators.maxLength(10),
      ]
    ],
    password: ['', Validators.required]
  })
  // login by phone 

  // login by user-name 
  LoginByUserName = this._formBuilder.group({
    userName: ['', Validators.required],
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
      shape: 'pill',
      width: 400,
      height : 200,
      logo_alignment: 'center',
      longtitle: true, 
      text : 'continue_with'
    });
  }
  // show pass word
  ShowPassWord() {
    this.hasPassword = !this.hasPassword;
    this.iconButotn = !this.iconButotn;
    if (this.tileButtonShowPassword == 'Hiển thị mật khẩu') {
      this.tileButtonShowPassword = 'Ẩn mật khẩu';
      return;
    }
    this.tileButtonShowPassword = 'Hiển thị mật khẩu'
  }
  Sumbit_Form() {
    this.buttonLoading = false;
    const userName: string = LoginGeneral.getFormValue(this.LoginByUserName, 'userName');
    const passWord: string = LoginGeneral.getFormValue(this.LoginByUserName, 'password');
    const request: loginRequest = LoginGeneral.getLoginRequest(userName, passWord);

    console.log(request);
    // this.loginService.loginWithUserName(request).subscribe(
    //   response => {
    //     console.log(response);
    //     // this.router.navigate(["/"]);
    //   },
    //   error => {
    //     if (error != null) {
    //       this.buttonLoading = true;
    //       this.hasError = true;
    //       setTimeout(() => {
    //         this.hasError = false;
    //       }, 2000)
    //     }
    //   }
    // )
  }
  private decodeToken(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }
  LoginWthGoogle(){
    console.log(1);
    google.accounts.id.initialize({
      client_id: '466166882774-7tso04lmusd37v562kgcccjdmt1schra.apps.googleusercontent.com',
      callback: (resp: any) => this.handleLogin(resp)
    });
  }
  handleLogin(response: any) {
    if (!response) return;
    // using ngZone when change page 
    this.ngZone.run(() => {
      const payLoad = this.decodeToken(response.credential);
      sessionStorage.setItem('tokenLogin', JSON.stringify(payLoad));
      this.router.navigate(['/']);
    });
  }
}