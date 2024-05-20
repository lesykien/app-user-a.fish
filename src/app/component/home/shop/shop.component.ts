import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { productsUserShop } from '../../../model/products.model';
import { productAdminResponse } from '../../../model/products.model';
import { ImagesResponse } from '../../../model/image.model';
import { cartRequest } from '../../../model/cart.model';
import { CartService } from '../../../service/cart.service';
import { _cart } from '../../../involvement/cart.involvement';
import { category } from '../../../model/category.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { CategoryService } from '../../../service/category.service';
import { response } from 'express';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cateogryServeci: CategoryService
  ) {}

  detalProduct!: productAdminResponse;
  listUrls: ImagesResponse[] = [];
  listProduct: productsUserShop[] = [];

  listCategorys: category[] = [];

  isActive: number = 0;

  ngOnInit(): void {
    this.LoadingPage();
    this.detalProduct = productGeneral.ConvertProductResponse();
  }

  LoadingPage() {
    this.FilterCategory(0);
    this.cateogryServeci.getData().subscribe((response) => {
      this.listCategorys = response;
    });
  }
  FilterCategory(id: number) {
    this.isActive = id;
    this.cateogryServeci.getProductsByCategory(id).subscribe((response) => {
      this.listProduct = response;
    });
  }

  DetalItem(id: string) {
    this.GetInformationItem(id);
  }
  GetInformationItem(id: string) {
    this.productService.getDataByIdAdmin(id).subscribe((response) => {
      this.detalProduct = response;
      this.listUrls = response.images;
    });
  }
  // add to cart
  AddToCart(id: string) {
    this.cartService.getItemUsingCart(id).subscribe((response) => {
      this.AddToCartNotUser(response);
    });
  }

  AddToCartNotUser(item: product) {
    let idUser: number = Number(localStorage.getItem('idUser'));
    if (!idUser) {
      _cart.SetCartLocal(item, `cart`);
      return;
    }
    _cart.SetCartLocal(item, `cart${idUser}`);
  }
}
