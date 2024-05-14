import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/product.model/products.model';
import { productsUserShop } from '../../../model/product.model/product.user.shop';
import { productAdminResponse } from '../../../model/product.model/product.admin.response';
import { ImagesResponse } from '../../../model/images.model/image.response';
import { cartRequest } from '../../../model/cart.model/cart.request';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService, 
    private cartService : CartService
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
