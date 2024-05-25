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
  isRexgeFullName: string =
    '^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$';

  firstFormGroup = this.form.group({
    adress: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^@$#%^&*()\\-+={}\\[\\]|\\\\:;"\'<>.?~!]+$'),
      ],
    ],
    email: ['', [Validators.required, Validators.email]],
    fullName: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.isRexgeFullName),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
  });
  secondFormGroup = this.form.group({
    otp1: ['', Validators.required],
    otp2: ['', Validators.required],
    otp3: ['', Validators.required],
    otp4: ['', Validators.required],
    otp5: ['', Validators.required],
    otp6: ['', Validators.required],
  });
  isLinear = false;

  resOtp: singleResponse = {
    code: 0,
    message: '',
  };

  countSend: number = 0;

  userId: userModel = user.Convert();
  otpForm: otpCode = user.RenderNew();

  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let id: number = Number(localStorage.getItem('idUser'));
      this.accountService.getData(id).subscribe((response) => {
        this.RenderUser(response);
      });
    }
  }

  SendEmail(count: number) {
    this.AutoLogout(count);
    if (count === 3) {
      return;
    }
    this.countSend = count + 1;
    this.userId = this.firstFormGroup.value as userModel;
    this.SendCodeOTP(this.userId.email);
  }

  SendCodeOTP(email: string) {
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
    this.otpForm = this.secondFormGroup.value as otpCode;
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
        return;
      }
    });
  }

  RenderUser(item: userModel) {
    this.firstFormGroup.get('fullName')!.setValue(item.fullName);
    this.firstFormGroup.get('phone')!.setValue(item.phone);
    this.firstFormGroup.get('adress')!.setValue(item.adress);
    this.firstFormGroup.get('email')!.setValue(item.email);
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
