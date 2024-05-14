import { Component, OnInit } from '@angular/core';
import { product } from '../../../model/product.model/products.model';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { cartRequest } from '../../../model/cart.model/cart.request';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit {
  listProduct!: product[];
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }
  ngOnInit(): void {
    this.productService.getData().subscribe((response: product[]) => {
      this.listProduct = response;
    })
  }
  AddToCart(id: string) {
    const request: cartRequest = {
      idProduct: id,
      idUser: 0
    }
    this.cartService.addCart(request).subscribe(response => {
      alert('Thêm sản phẩm thành công');
      if (response.code == 200) {
        sessionStorage.setItem('loading', '1');
      }
    })
  }

}
