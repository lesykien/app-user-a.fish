import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) { }
  GetEmail = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });
  GetCodeOTP = this._formBuilder.group({
    codeOTP: ['', Validators.required],
  });
  NewPassword = this._formBuilder.group({
    newpassword: ['', Validators.required],
    confirmpass: ['', Validators.required],
  });


  isLinear = false;
  ngOnInit(): void {

  }
  getValues_input(input: any): string {
    if (typeof input === 'object' && input !== null && typeof input.get === 'function') {
      return input.get('firstCtrl')?.value || '';
    }
    return '';
  }
}
