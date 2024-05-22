import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { order } from '../model/cart.model';
import { involvement } from '../involvement/api.involvement';
import { singleResponse } from '../model/single.responser';
import { Observable } from 'rxjs';
import {
  cancelRequest,
  oderUser,
  orderAdminDTOs,
  orderAdminResponse,
} from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}

  create(order: order) {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Order`,
      order
    );
  }

  getDataAdmin(status: number): Observable<orderAdminDTOs[]> {
    return this.http.get<orderAdminDTOs[]>(
      `${involvement.api}/api/Order/page-admin/${status}`
    );
  }

  UpdateStatus(id: string) {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Order/edit-status/${id}`,
      id
    );
  }

  cancelOder(request: cancelRequest) {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Order/cancel-oder`,
      request
    );
  }

  getDataById(id: string): Observable<orderAdminResponse> {
    return this.http.get<orderAdminResponse>(
      `${involvement.api}/api/Order/get-by/${id}`
    );
  }

  getDataByIdUser(model: oderUser) {
    return this.http.post<orderAdminDTOs[]>(
      `${involvement.api}/api/Order/get-user`,
      model
    );
  }

  countItem(id: number): Observable<singleResponse> {
    return this.http.get<singleResponse>(
      `${involvement.api}/api/Order/count-order/${id}`
    );
  }

  updateAddress(request: cancelRequest) {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Order/update-address`,
      request
    );
  }
}
