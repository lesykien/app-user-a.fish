import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { productsUserShop } from '../../../model/products.model';
import { productAdminResponse } from '../../../model/products.model';
import { ImagesResponse } from '../../../model/image.model';
import { CartService } from '../../../service/cart.service';
import { _cart } from '../../../involvement/cart.involvement';
import { category } from '../../../model/category.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { CategoryService } from '../../../service/category.service';
import { _about } from '../../../model/about.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { v5 as uuidv5 } from 'uuid';
import { involvement } from '../../../involvement/api.involvement';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss',
})
export class ShopComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private cateogryServeci: CategoryService,
    private pramaster: ActivatedRoute,
    private router: Router
  ) {}

  detalProduct!: productAdminResponse;
  listUrls: ImagesResponse[] = [];
  listProduct: productsUserShop[] = [];
  listCategorys: category[] = [];
  isActive: number = 0;
  uuidMap: { [key: string]: string } = {};

  ngOnInit(): void {
    this.detalProduct = productGeneral.ConvertProductResponse();
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.FirstLoaing();
      }
    });
    this.FirstLoaing();
  }
  FirstLoaing() {
    this.uuidMap = this.MapUUI();
    let search: string = this.pramaster.snapshot.params['search'];
    let encodingString: string = this.decodeUuidToString(search);
    if (encodingString == undefined) {
      this.LoadingPage();
    } else {
      this.LoadingSearch(encodingString);
      this.cateogryServeci.getData().subscribe((response) => {
        this.listCategorys = response;
      });
    }
  }
  decodeUuidToString(uuid: string): string {
    return this.uuidMap[uuid];
  }

  MapUUI(): any {
    const local = localStorage.getItem('keySearch');
    let res = {};
    if (local) {
      res = JSON.parse(local);
    }
    return res;
  }

  LoadingPage() {
    this.FilterCategory(0);
    this.cateogryServeci.getData().subscribe((response) => {
      this.listCategorys = response;
    });
  }

  LoadingSearch(search: string) {
    let form = new FormData();
    form.append('name', search);

    this.productService.getProductSearch(form).subscribe((response) => {
      this.listProduct = response;
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
      _about.SetItemLocal(response);
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

  generateUuidFromString(id: string): string {
    return uuidv5(id, involvement.namespace);
  }
  ProductHome(id: string) {
    let encodingid: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encodingid, id);
      this.router.navigate([`product-home/${encodingid}`]);
    }
  }
}
