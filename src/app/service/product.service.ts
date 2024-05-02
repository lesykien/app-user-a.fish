import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { product } from '../model/products.model';
import { involvement } from '../involvement/api.involvement';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor( private http: HttpClient) { }

  getData():Observable<product[]>{
    return this.http.get<product[]>(`${involvement.api}/*api/Product/get-product`)
  }
}