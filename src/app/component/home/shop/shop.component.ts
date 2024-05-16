import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { productsUserShop } from '../../../model/products.model';
import { productAdminResponse } from '../../../model/products.model';
import { ImagesResponse } from '../../../model/image.model';
import { cartRequest } from '../../../model/cart.model';
import { CartService } from '../../../service/cart.service';
import { _cart } from '../../../involvement/cart.involvement';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) { }

  detalProduct!: productAdminResponse;
  listUrls: ImagesResponse[] = [];
  listProduct: productsUserShop[] = []

  ngOnInit(): void {
    this.productService.getDataUserShop().subscribe(response => {
      this.listProduct = response;
    })
    this.detalProduct = {
      id: '',
      name: '',
      price: 0,
      images: [],
      status: false,
      vourcher: 0,
      description: '',
      idCategory: 1,
    }
  }
  DetalItem(id: string) {
    this.GetInformationItem(id)
  }

  GetInformationItem(id: string) {
    this.productService.getDataByIdAdmin(id).subscribe(response => {
      this.detalProduct = response;
      this.listUrls = response.images;
    })
  }

  // add to cart
  AddToCart(id: string) {
    this.cartService.getItemUsingCart(id).subscribe((response) => {
      this.AddToCartNotUser(response);
    })
  }

  AddToCartNotUser(item: product) {
    let idUser: number = Number(sessionStorage.getItem('idUser'));
    if (!idUser) {
      _cart.SetCartLocal(item, `cart`);
      return;
    }
    _cart.SetCartLocal(item, `cart${idUser}`);
  }
}
