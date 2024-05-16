import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { involvement } from '../involvement/api.involvement';
import { BehaviorSubject, Observable } from 'rxjs';
import { cartRequest } from '../model/cart.model';
import { cartNotIdUser } from '../model/cart.model';
import { singleResponse } from '../model/single.responser';
import { product } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cartItemsSubject = new BehaviorSubject<number>(0);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) { }

  addCart(request: cartRequest): Observable<singleResponse> {
    return this.http.post<singleResponse>(`${involvement.api}/api/Cart`, request)
  }

  getDataNotIdUser(): Observable<cartNotIdUser[]> {
    return this.http.get<cartNotIdUser[]>(`${involvement.api}/api/Cart`)
  }

  getDataByIdToken(id: number): Observable<cartNotIdUser[]> {
    return this.http.get<cartNotIdUser[]>(`${involvement.api}/api/Cart/get-all/${id}`)
  }

  removeItem(id: number): Observable<any> {
    return this.http.delete<any>(`${involvement.api}/api/Cart/${id}`)
  }

  addIdUser(id: number): Observable<any> {
    return this.http.get<any>(`${involvement.api}/api/Cart/add-id/${id}`);
  }

  getItemUsingCart(id: string): Observable<product> {
    return this.http.get<product>(`${involvement.api}/api/Product/get-using-cart/${id}`)
  }
}
