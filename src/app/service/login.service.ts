import { Injectable } from '@angular/core';
import { involvement } from '../involvement/api.involvement';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { loginRequest } from '../model/login.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  loginWithUserName(request: loginRequest) {
    return this.http.post<any>(`${involvement.api}/api/Account/login-user-name`, request)
  }
}
