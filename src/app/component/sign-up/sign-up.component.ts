import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  constructor(private _formBuilder: FormBuilder) { }
  isLinear = true;
  email_phone = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  full_name = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  userName = this._formBuilder.group({
    user: ['', Validators.required],
  });
}
