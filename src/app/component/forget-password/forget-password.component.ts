import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  constructor(private _formBuilder: FormBuilder) { }
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  isLinear = true;
  ngOnInit(): void {

  }
  getValues_input(input: any): string {
    if (typeof input === 'object' && input !== null && typeof input.get === 'function') {
      return input.get('firstCtrl')?.value || '';
    }
    return '';
  }

  Step_Next() {
    console.log(this.getValues_input(this.firstFormGroup));
  }



}
