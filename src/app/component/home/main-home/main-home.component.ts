import { Component, OnInit } from '@angular/core';
import { product } from '../../../model/products.model';
import { ProductService } from '../../../service/product.service';
import { CartService } from '../../../service/cart.service';
import { cartRequest } from '../../../model/cart.model';
import { _cart } from '../../../involvement/cart.involvement';
import { productGeneral } from '../../../involvement/product.involvement';
import { v5 as uuidv5 } from 'uuid';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrl: './main-home.component.scss',
})
export class MainHomeComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  listProduct: product[] = [];

  listProductsNew: product[] = [];
  newProduct: product = productGeneral.HandleStar();

  listVoucher: product[] = [];
  voucherItem: product = productGeneral.HandleStar();

  listHot: product[] = [];
  hotItem: product = productGeneral.HandleStar();
  namespace: string = 'e7f63e04-3851-47f4-9ac8-13e7dbbde914';

  page: number = 1;
  isBtnSeeMore: boolean = true;

  ngOnInit(): void {
    this.LoadPage(this.page);
    this.GetProductUsingHome();
    this.GetWithVoucher();
    this.GetProductHot();
  }

  LoadPage(page: number) {
    this.page = page + 1;
    this.productService.seeMoreItem(page).subscribe((response: product[]) => {
      if (response.length > 0) {
        this.PushArray(response);
        return;
      }
      this.isBtnSeeMore = false;
    });
  }

  PushArray(response: product[]) {
    for (let item of response) {
      this.listProduct.push(item);
    }
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
    });
  }
  // lấy thông tin 5 sản phẩm mới nhât

  // lấy thông tin 5 sản phẩm mới nhât
  GetWithVoucher() {
    this.productService.getWithVoucher().subscribe((response) => {
      this.voucherItem = response[0];
      this.listVoucher = productGeneral.RemoveFistItme(response);
    });
  }
  // lấy thông tin 5 sản phẩm mới nhât

  GetProductHot() {
    this.productService.getProductsHot().subscribe((response) => {
      this.hotItem = response[0];
      this.listHot = productGeneral.RemoveFistItme(response);
    });
  }

  // router -> product detal
  generateUuidFromString(id: string): string {
    return uuidv5(id, this.namespace);
  }
  ProductHome(id: string) {
    let encodingid: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encodingid, id);
      this.router.navigate([`product-home/${encodingid}`]);
    }
  }
}
