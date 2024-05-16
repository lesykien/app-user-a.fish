import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { involvement } from '../involvement/api.involvement';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getData(request: number) {
    return this.http.get<any>(`${involvement.api}/api/Account/get-data/${request}`)
  }

  removeItemToken(id: number) {
    return this.http.delete<any>(`${involvement.api}/api/Account/remove-item/${id}`)
  }
}
