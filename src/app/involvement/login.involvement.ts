import { FormGroup } from "@angular/forms";
import { loginRequest } from "../model/login-request.model";

export class LoginGeneral {
    constructor() { }
    // get values from input
    static getFormValue(group: FormGroup, controlName: string): string {
        return group.get(controlName)?.value ?? '';
    }
    // get values from input

    // convert information form enter object login request
    static getLoginRequest(userName: string, passWord: string): loginRequest {
        return {
            username: userName,
            passWord: passWord,
        }
    }
    // convert information form enter object login request

}