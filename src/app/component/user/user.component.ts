import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { otpCode, userModel, userRequest } from '../../model/user.model';
import { user } from '../../involvement/user.involvement';
import { AccountService } from '../../service/account.service';
import { singleResponse } from '../../model/single.responser';
import * as CryptoJS from 'crypto-js';

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

  resOtp: singleResponse = {
    code: 0,
    message: '',
  };

  countSend: number = 0;

  userId: userModel = user.Convert();
  otpForm: otpCode = user.RenderNew();

  LoadPage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let id: number = Number(localStorage.getItem('idUser'));
      this.accountService.getData(id).subscribe((response) => {
        this.userId = response;
      });
    }
  }

  SendCodeOTP(email: string, count: number) {
    this.AutoLogout(count);
    if (count === 3) {
      return;
    }
    this.countSend = count + 1;
    this.resOtp = {
      code: 0,
      message: '',
    };
    let timeout: number = 50000;
    let form = new FormData();
    form.append('emailTo', email);
    this.accountService.sendcodeotp(form).subscribe((response) => {
      this.resOtp = response;
      if (response.message.trim() != '0') {
        setTimeout(() => {
          this.resOtp = {
            code: 1,
            message: '',
          };
        }, timeout);
      }
    });
  }

  ToBack() {
    this.resOtp = {
      code: 0,
      message: '',
    };
  }
  AutoLogout(count: number) {
    if (count === 3) {
      let id: number = Number(localStorage.getItem('idUser'));
      if (!id) return;
      this.accountService.removeItemToken(id).subscribe((response) => {
        if (response.code == 200) {
          localStorage.removeItem('idUser');
          window.location.reload();
        }
      });
    }
  }

  GetOTP(otpData: string) {
    this.otpForm = {
      otp1: this.otpForm.otp1,
      otp2: this.otpForm.otp2,
      otp3: this.otpForm.otp3,
      otp4: this.otpForm.otp4,
      otp5: this.otpForm.otp5,
      otp6: this.otpForm.otp6,
    };
    let otpItem: string = user.ConverString(this.otpForm);
    const otpHasMD5 = CryptoJS.MD5(otpItem).toString(CryptoJS.enc.Hex);
    if (otpData.trim() === otpHasMD5.trim()) {
      this.resOtp = {
        code: 0,
        message: '',
      };
      this.UpdateUser();
      return;
    }
  }

  UpdateUser() {
    const users: userRequest = user.ConsUserRequest(this.userId);
    this.accountService.updateUser(users).subscribe((response) => {
      this.resOtp = response;
      if (response.code == 200) {
        window.location.reload();
        return;
      }
    });
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
