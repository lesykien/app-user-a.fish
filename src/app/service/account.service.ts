import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { involvement } from '../involvement/api.involvement';
import { Observable } from 'rxjs';
import { singleResponse } from '../model/single.responser';
import { HtmlParser } from '@angular/compiler';
import { userRequest } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  getData(request: number) {
    return this.http.get<any>(
      `${involvement.api}/api/Account/get-data/${request}`
    );
  }

  removeItemToken(id: number) {
    return this.http.delete<any>(
      `${involvement.api}/api/Account/remove-item/${id}`
    );
  }

  sendcodeotp(emailTo: FormData): Observable<singleResponse> {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Account/send-otp`,
      emailTo
    );
  }

  updateUser(request: userRequest): Observable<singleResponse> {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Account/update-user`,
      request
    );
  }

  loginByGoogle(email: FormData): Observable<singleResponse> {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Account/login-google`,
      email
    );
  }
}
