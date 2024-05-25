import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { category } from '../model/category.model';
import { involvement } from '../involvement/api.involvement';
import { productsUserShop } from '../model/products.model';
import { singleResponse } from '../model/single.responser';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getData(): Observable<category[]> {
    return this.http.get<category[]>(
      `${involvement.api}/api/Categoty/get-item`
    );
  }

  getProductsByCategory(id: number): Observable<productsUserShop[]> {
    return this.http.get<productsUserShop[]>(
      `${involvement.api}/api/Categoty/product-by/${id}`
    );
  }

  additem(form: FormData) {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Categoty/add-item`,
      form
    );
  }

  removeitem(id: number) {
    return this.http.delete<singleResponse>(
      `${involvement.api}/api/Categoty/remove-item-${id}`
    );
  }

  updateitem(request: category) {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Categoty/update-item`,
      request
    );
  }
}
