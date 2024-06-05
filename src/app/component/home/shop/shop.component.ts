import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { productsUserShop } from '../../../model/products.model';
import { productAdminResponse } from '../../../model/products.model';
import { ImagesResponse } from '../../../model/image.model';
import { CartService } from '../../../service/cart.service';
import { _cart } from '../../../involvement/cart.involvement';
import {
  _categorys,
  category,
  categoryShop,
} from '../../../model/category.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { CategoryService } from '../../../service/category.service';
import { _about } from '../../../model/about.model';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { v5 as uuidv5 } from 'uuid';
import { involvement } from '../../../involvement/api.involvement';
import { fiter, shop } from '../../../model/shop.model';

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
  isFiter: number = 0;
  listFiter: fiter[] = shop.create();
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
    this.FiterByType(0, 0);
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

  DetalItem(id: string) {
    shop.SaveUserSee(id);
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
    shop.SaveUserSee(id);
    let encodingid: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encodingid, id);
      this.router.navigate([`product-home/${encodingid}`]);
    }
  }

  ByNow(id: string) {
    let encoding = this.generateUuidFromString(id);

    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encoding, id);
      this.router.navigate([`by-now/${encoding}`]);
    }
  }
  isSticky: boolean = false;
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
      this.isSticky = true;
    } else {
      this.isSticky = false;
    }
  }

  FiterByType(type: number, id: number) {
    this.isActive = id;
    this.cateogryServeci.getProductsByCategory(id).subscribe((response) => {
      this.Filter(type, response, id);
    });
  }

  Filter(type: number, response: productsUserShop[], id: number) {
    if (type == 0 || type == 4) {
      this.listProduct = response;
    } else if (type == 1) {
      this.listProduct = response.sort((a, b) => b.price - a.price);
    } else if (type == 2) {
      this.listProduct = response.sort((a, b) => a.price - b.price);
    } else if (type == 3) {
      this.GetItemsHotSale(id);
    } else if (type == 5) {
      this.listProduct = response.sort((a, b) => b.voucher - a.voucher);
    } else if (type == 6) {
      let list: string[] = shop.GetLocal();
      this.PushItemEnter(response, list);
    }
  }

  PushItemEnter(response: productsUserShop[], list: string[]) {
    this.listProduct = [];
    list.forEach((item) => {
      let i: productsUserShop = response.find(
        (a) => a.id == item
      ) as productsUserShop;
      if (!i) {
        return;
      }
      this.listProduct.push(i);
    });
  }

  GetItemsHotSale(id: number) {
    this.productService.getHotSale(id).subscribe((response) => {
      this.listProduct = response;
    });
  }

  RemoveItem(id: string, type: number, idCategory: number) {
    let isMes: boolean = confirm('Bạn có muốn xóa item này không');
    if (isMes) {
      let isRemove: boolean = shop.RemoveItem(id);
      if (isRemove) {
        this.FiterByType(type, idCategory);
      }
    }
  }
}
