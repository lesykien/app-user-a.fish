import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { userModel } from '../../model/user.model';
import { user } from '../../involvement/user.involvement';
import { AccountService } from '../../service/account.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private accountService: AccountService
  ) {}
  ngOnInit(): void {
    this.LoadPage();
  }
  firstFormGroup = this.form.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this.form.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;

  userId: userModel = user.Convert();
  name: string = 'con các';
  address: string = ' ';

  LoadPage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let id: number = Number(localStorage.getItem('idUser'));
      this.accountService.getData(id).subscribe((response) => {
        this.userId = response;
      });
    }
  }

  onInput(event: Event, nextInput: HTMLInputElement | null) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;
    if (!/^[0-9]*$/.test(value)) {
      inputElement.value = value.replace(/[^0-9]/g, '');
    }
    if (value.length === 1 && /^[0-9]$/.test(value) && nextInput) {
      nextInput.focus();
    }
  }
}
