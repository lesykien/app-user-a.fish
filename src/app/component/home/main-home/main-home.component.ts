import { Component, OnInit } from '@angular/core';
import { product } from '../../../model/products.model';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { cartRequest } from '../../../model/cart.model';
import { _cart } from '../../../involvement/cart.involvement';

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
    let idToken: number = Number(sessionStorage.getItem('idUser'));
    const request: cartRequest = {
      idProduct: id,
      idUser: idToken
    }
    this.cartService.addCart(request).subscribe(response => {
      if (response.code == 200) {
        alert('Thêm sản phẩm thành công');
      }
    })
  }

  // thêm sản phẩm vào giỏ hàng khi chưa đăng nhập
  AddToCartWhenNotLogin(item: product) {
    let idUser: number = Number(sessionStorage.getItem('idUser'));
    if (!idUser) {
      _cart.SetCartLocal(item, `cart`);
      return;
    }
    _cart.SetCartLocal(item, `cart${idUser}`);
  }
  // thêm sản phẩm vào giỏ hàng khi chưa đăng nhập

}
