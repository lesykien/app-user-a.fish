import { Component, OnInit } from '@angular/core';
import { product } from '../../../model/products.model';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit {
  listProduct!: product[];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    // this.productService.getData().subscribe((response: product[]) => {
    //   this.listProduct = response;
    //   console.log(this.listProduct);
    // })
  }

}
