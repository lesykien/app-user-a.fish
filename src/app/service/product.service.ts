import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../model/products.model';
import { involvement } from '../involvement/api.involvement';
import { productAdminResponse } from '../model/products.model';
import { productRequest } from '../model/products.model';
import { productsUserShop } from '../model/products.model';
import { get } from 'http';
import { singleResponse } from '../model/single.responser';
@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getData(): Observable<product[]> {
    return this.http.get<product[]>(
      `${involvement.api}/api/Product/get-all-item`
    );
  }

  getDataUserShop(): Observable<productsUserShop[]> {
    return this.http.get<productsUserShop[]>(
      `${involvement.api}/api/Product/get-item-user-shop`
    );
  }

  getDataByIdAdmin(id: string | null): Observable<productAdminResponse> {
    return this.http.get<productAdminResponse>(
      `${involvement.api}/api/Product/get-by-id/${id}`
    );
  }

  addItem(form: FormData): Observable<any> {
    return this.http.post<any>(`${involvement.api}/api/Product/add-item`, form);
  }

  updateItem(form: FormData): Observable<any> {
    return this.http.post<any>(
      `${involvement.api}/api/Product/update-item`,
      form
    );
  }

  getUsingHome(): Observable<product[]> {
    return this.http.get<product[]>(`${involvement.api}/api/Product/get-home`);
  }

  getWithVoucher(): Observable<product[]> {
    return this.http.get<product[]>(
      `${involvement.api}/api/Product/get-voucher`
    );
  }

  updateStatus(id: string): Observable<singleResponse> {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Product/update-status/${id}`,
      id
    );
  }

  getAboutUser(id: string): Observable<product[]> {
    return this.http.get<product[]>(
      `${involvement.api}/api/Product/get-about/${id}`
    );
  }

  getProductsHot(): Observable<product[]> {
    return this.http.get<product[]>(
      `${involvement.api}/api/Product/get-home-hot`
    );
  }

  getProductSearch(form: FormData): Observable<productsUserShop[]> {
    return this.http.post<productsUserShop[]>(
      `${involvement.api}/api/Product/search-name`,
      form
    );
  }

  DeleteImage(id: number) {
    return this.http.delete<singleResponse>(
      `${involvement.api}/api/Images/delete-img-${id}`
    );
  }

  ChangesImage(id: number) {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Images/change-image-${id}`,
      id
    );
  }

  seeMoreItem(page: number): Observable<product[]> {
    return this.http.get<product[]>(
      `${involvement.api}/api/Product/more-item-${page}`
    );
  }

  getHotSale(id : number): Observable<productsUserShop[]> {
    return this.http.get<productsUserShop[]>(
      `${involvement.api}/api/Product/filter-hot-sale-${id}`
    );
  }
}
