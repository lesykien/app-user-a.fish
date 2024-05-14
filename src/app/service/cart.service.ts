import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { involvement } from '../involvement/api.involvement';
import { Observable } from 'rxjs';
import { cartRequest } from '../model/cart.model/cart.request';
import { cartNotIdUser } from '../model/cart.model/cart-not-id-user.response';
import { singleResponse } from '../model/General.model/single.responser';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addCart(request: cartRequest): Observable<singleResponse> {
    return this.http.post<singleResponse>(`${involvement.api}/api/Cart`, request)
  }

  getDataNotIdUser(): Observable<cartNotIdUser[]> {
    return this.http.get<cartNotIdUser[]>(`${involvement.api}/api/Cart`)
  }

  removeItem(id: number): Observable<any> {
    return this.http.delete<any>(`${involvement.api}/api/Cart/${id}`)
  }
}
