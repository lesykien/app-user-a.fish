import { FormGroup } from "@angular/forms";
import { SignUpModel } from "../model/sign-up-request.model";

export class SignUpGeneral {
    constructor() { }
    static ChangeTitlePass(tileButtonShowPassword: string): string {
        if (tileButtonShowPassword == 'Hiển thị mật khẩu') {
            tileButtonShowPassword = 'Ẩn mật khẩu';
            return tileButtonShowPassword;
        }
        return tileButtonShowPassword = 'Hiển thị mật khẩu'
    }

    // get values from input
    static getFormValue(group: FormGroup, controlName: string): string {
        return group.get(controlName)?.value ?? '';
    }
    // get values from input

    // convert information form enter object login request
    static getSignUpRequest(email: string, phone: string, fulleName: string, adress: string, userName: string, passWord: string): SignUpModel {
        return {
            emai: email,
            phone: phone,
            fullName: fulleName,
            adress: adress,
            userName: userName,
            passWord: passWord,
        }
    }
}