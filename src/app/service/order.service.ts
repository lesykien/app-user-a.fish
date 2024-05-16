import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../model/cart.model';
import { involvement } from '../involvement/api.involvement';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  create(order: order) {
    return this.http.post<any>(`${involvement.api}/api/Order`, order);
  }
}
