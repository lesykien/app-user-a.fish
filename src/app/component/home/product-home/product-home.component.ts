import { Component, HostListener, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import {
  product,
  productAdminResponse,
  productsUserShop,
} from '../../../model/products.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { _cart } from '../../../involvement/cart.involvement';
import { involvement } from '../../../involvement/api.involvement';
import { v5 as uuidv5 } from 'uuid';
import { CategoryService } from '../../../service/category.service';

@Component({
  selector: 'app-product-home',
  templateUrl: './product-home.component.html',
  styleUrl: './product-home.component.scss',
})
export class ProductHomeComponent implements OnInit {
  constructor(
    private _product: ProductService,
    private pramaster: ActivatedRoute,
    private router: Router,
    private _catrgorys: CategoryService
  ) { }

  items: productAdminResponse = productGeneral.ConvertProductResponse();
  listProduct: productsUserShop[] = [];
  isBtnTop: boolean = false;
  ngOnInit(): void {
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadPage();
      }
    });
    this.LoadPage();
  }

  LoadPage() {
    let encodingid: string = this.pramaster.snapshot.params['id'];
    let id: string = sessionStorage.getItem(encodingid) as string;
    this.GetInformationItem(id);
  }

  GetInformationItem(id: string) {
    this._product.getDataByIdAdmin(id).subscribe((response) => {
      this.items = response;
      this.LoadAlikeProduct(response.idCategory, response.id);
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
  generateUuidFromString(id: string): string {
    return uuidv5(id, involvement.namespace);
  }
  ByNow(id: string) {
    let encoding = this.generateUuidFromString(id);

    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encoding, id);
      this.router.navigate([`by-now/${encoding}`]);
    }
  }
  ProductHome(id: string) {
    let encodingid: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encodingid, id);
      this.router.navigate([`product-home/${encodingid}`]);
    }
  }
  LoadAlikeProduct(id: number, idProduct: string) {
    this._catrgorys.getProductsByCategory(id).subscribe((response) => {
      let list = response.filter((a) => a.id != idProduct);
      this.listProduct =
        list.length >= 5 ? list.slice(0, 3) : list.slice(0, list.length);
    });
  }
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // bắt sự kiện scroll của windown
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
      this.isBtnTop = true;
    } else {
      this.isBtnTop = false;
    }
  }
}
