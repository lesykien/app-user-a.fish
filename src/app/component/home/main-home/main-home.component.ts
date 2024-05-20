import { Component, OnInit } from '@angular/core';
import { product } from '../../../model/products.model';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { cartRequest } from '../../../model/cart.model';
import { _cart } from '../../../involvement/cart.involvement';
import { productGeneral } from '../../../involvement/product.involvement';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss'
})
export class MainHomeComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  listProduct!: product[];

  listProductsNew: product[] = [];
  newProduct: product = productGeneral.HandleStar();

  listVoucher: product[] = [];
  voucherItem: product = productGeneral.HandleStar();

  ngOnInit(): void {
    this.LoadPage();
    this.GetProductUsingHome();
    this.GetWithVoucher();
  }

  LoadPage() {
    this.productService.getData().subscribe((response: product[]) => {
      this.listProduct = response;
    })
  }
  // thêm sản phẩm vào giỏ hàng khi chưa đăng nhập
  AddToCartWhenNotLogin(item: product) {
    let idUser: number = Number(localStorage.getItem('idUser'));
    if (!idUser) {
      _cart.SetCartLocal(item, `cart`);
      return;
    }
    _cart.SetCartLocal(item, `cart${idUser}`);
  }
  // thêm sản phẩm vào giỏ hàng khi chưa đăng nhập

  // lấy thông tin 5 sản phẩm mới nhât
  GetProductUsingHome() {
    this.productService.getUsingHome().subscribe((response) => {
      this.newProduct = response[0];
      this.listProductsNew = productGeneral.RemoveFistItme(response);
    })
  }
  // lấy thông tin 5 sản phẩm mới nhât

  // lấy thông tin 5 sản phẩm mới nhât
  GetWithVoucher() {
    this.productService.getWithVoucher().subscribe((response) => {
      this.voucherItem = response[0];
      this.listVoucher = productGeneral.RemoveFistItme(response);
    })
  }
  // lấy thông tin 5 sản phẩm mới nhât

}
