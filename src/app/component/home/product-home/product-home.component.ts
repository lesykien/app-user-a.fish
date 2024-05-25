import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute } from '@angular/router';
import { product, productAdminResponse } from '../../../model/products.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { _cart } from '../../../involvement/cart.involvement';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
})
export class ProductHomeComponent implements OnInit {
  constructor(
    private _product: ProductService,
    private pramaster: ActivatedRoute
  ) {}

  items: productAdminResponse = productGeneral.ConvertProductResponse();
  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    let encodingid: string = this.pramaster.snapshot.params['id'];
    let id: string = sessionStorage.getItem(encodingid) as string;
    console.log(id);
    this.GetInformationItem(id);
  }

  GetInformationItem(id: string) {
    this._product.getDataByIdAdmin(id).subscribe((response) => {
      this.items = response;
    });
  }

  // thêm sản phẩm vào giỏ hàng
  AddToCart(itemPorduct: productAdminResponse) {
    let item: product = _cart.PostItem(itemPorduct);
    let idUser: number = Number(localStorage.getItem('idUser'));
    if (!idUser) {
      _cart.SetCartLocal(item, `cart`);
      return;
    }
    _cart.SetCartLocal(item, `cart${idUser}`);
  }
}
