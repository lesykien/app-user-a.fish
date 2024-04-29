import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder, private _router: ActivatedRoute) { }

  Login_Form = this._formBuilder.group({
    password: ['', Validators.required],
    phone: ['', [Validators.required, Validators.maxLength(10), Validators.pattern('^(03|05|07|08|09|01[2689])[0-9]{8}\b')]],
    userName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]]
  })
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
  Login() {
    console.log(this.getFormValue(this.Login_Form, 'email'));
    console.log(this.getFormValue(this.Login_Form, 'password'));
  }
  Sumbit_Form() {
    this.Login();
  }


}
