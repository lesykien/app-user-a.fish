import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { loginRequest } from '../../model/login-request.model';
import { LoginService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(
    private _formBuilder: FormBuilder, 
    private _router: ActivatedRoute , 
    private loginService : LoginService, 
    private router: Router
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

  type!: string;
  ngOnInit(): void {
    this.type = this._router.snapshot.params['type'];
  }
  getFormValue(group: FormGroup, controlName: string): string {
    return group.get(controlName)?.value ?? '';
  }
  getLoginRequest(userName: string, passWord: string) : loginRequest {
    return {
      userName : userName, 
      passWord : passWord,
    }
  }
  Sumbit_Form() {
    const userName : string = this.getFormValue(this.LoginByUserName, 'userName');
    const passWord : string = this.getFormValue(this.LoginByUserName, 'password');
    const request : loginRequest = this.getLoginRequest( userName, passWord);

    this.loginService.loginWithUserName(request).subscribe( response => {
      this.router.navigate(["/"]);
    })

  }
}
