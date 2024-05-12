import { Component, OnInit } from '@angular/core';
import { involvement } from '../../involvement/api.involvement';
import { product } from '../../model/product.model/products.model';
import { ProductService } from '../../service/product.service';
import { response } from 'express';

@Component({
  selector: 'app-app-admin',
  templateUrl: './app-admin.component.html',
  styleUrl: './app-admin.component.scss'
})
export class AppAdminComponent implements OnInit {
  constructor ( private productService : ProductService){}
  ImageLogo : string = involvement.logo;
  productResponse!: product[];
  ngOnInit(): void {

  }

}
