import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpGeneral } from '../../involvement/sign-up.involvement';
import { SignUpModel } from '../../model/sign-up-request.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) { }
  isLinear = false;
  // show input passwrord
  hasPassword: boolean = false;
  iconButotn: boolean = false;
  tileButtonShowPassword: string = 'Hiển thị mật khẩu'
  // show input passwrord

  // show confirmpassword
  hasConfirmPass: boolean = false;
  iconButotnConfirm: boolean = false;
  tileButtonShowConfirm: string = 'Hiển thị mật khẩu'
  // show confirmpassword

  // get information email and phone
  email_phone = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.maxLength(10)]]
  });
  // get information email and phone
  
  full_name = this._formBuilder.group({
    fullname: ['', Validators.required],
    address: ['', Validators.required]
  });
  userName = this._formBuilder.group({
    username: ['', Validators.required],
  });
  passWord = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPass: ['', Validators.required]
  })
  ngOnInit(): void {

  }
  // show input passwrord
  ShowPassWord() {
    this.hasPassword = !this.hasPassword;
    this.iconButotn = !this.iconButotn;
    this.tileButtonShowPassword = SignUpGeneral.ChangeTitlePass(this.tileButtonShowPassword)
  }
  // show input passwrord

  // show confirmpassword
  ShowConfirm() {
    this.hasConfirmPass = !this.hasConfirmPass;
    this.iconButotnConfirm = !this.iconButotnConfirm;
    this.tileButtonShowConfirm = SignUpGeneral.ChangeTitlePass(this.tileButtonShowConfirm)
  }
  // show confirmpassword

  // Sumbit form input
  SumbitForm() {
    // Get information email , phone
    const email: string = SignUpGeneral.getFormValue(this.email_phone, 'email')
    const phone: string = SignUpGeneral.getFormValue(this.email_phone, 'phone')
    // Get information email , phone

    // Get information full name , adress
    const fullName: string = SignUpGeneral.getFormValue(this.full_name, 'fullname')
    const adress: string = SignUpGeneral.getFormValue(this.full_name, 'address')
    // Get information full name , adress

    // Get information user name
    const userName: string = SignUpGeneral.getFormValue(this.userName, 'username')
    // Get information user name

    // Get information password
    const passWord: string = SignUpGeneral.getFormValue(this.passWord, 'password')
    // Get information password
    
    const formInput: SignUpModel = SignUpGeneral.getSignUpRequest(email, phone, fullName, adress, userName, passWord)
    console.log(formInput);


  }
  // Sumbit form input
}
