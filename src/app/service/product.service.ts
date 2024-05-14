import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../model/product.model/products.model';
import { involvement } from '../involvement/api.involvement';
import { productAdminResponse } from '../model/product.model/product.admin.response';
import { productRequest } from '../model/product.model/product.request';
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  getData(): Observable<product[]> {
    return this.http.get<product[]>(`${involvement.api}/api/Product/get-all-item`)
  }

  getDataByIdAdmin(id: string | null): Observable<productAdminResponse> {
    return this.http.get<productAdminResponse>(`${involvement.api}/api/Product/get-by-id/${id}`)
  }

  addItem(form: FormData): Observable<any> {
    return this.http.post<any>(`${involvement.api}/api/Product/add-item`, form)
  }

  updateItem(form: FormData): Observable<any> {
    return this.http.post<any>(`${involvement.api}/api/Product/update-item`, form)
  }
}