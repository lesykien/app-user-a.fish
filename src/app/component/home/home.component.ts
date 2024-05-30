import { Component, NgZone, OnInit } from '@angular/core';
import { involvement } from '../../involvement/api.involvement';
import { CartService } from '../../service/cart.service';
import { AccountService } from '../../service/account.service';
import { cartLocal } from '../../model/cart.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { product, productsUserShop } from '../../model/products.model';
import { NavigationEnd, Router } from '@angular/router';
import { _cart } from '../../involvement/cart.involvement';
import { v5 as uuidv5 } from 'uuid';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  ImageLogo: string = involvement.logo;
  nameUser: string = '';
  countItem: number = 0;
  infomation: any = null;
  listProduct: productsUserShop[] = [];
  inputControl = new FormControl();
  isVisilible: boolean = false;

  openCart: boolean = false;

  uuidMap: { [key: string]: string } = {};

  namespace: string = 'e7f63e04-3851-47f4-9ac8-13e7dbbde914';

  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private productService: ProductService,
    private ngZone: NgZone,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.CountItemInCart();
      this.GetInformation();
    }
    this.ChangeSearch();
  }

  ChangeSearch() {
    this.inputControl.valueChanges
      .pipe(debounceTime(200))
      .subscribe((value) => {
        if (value.trim() == '') {
          this.isVisilible = false;
        } else {
          this.isVisilible = true;
        }
        this.CallBackSerch(value);
      });
  }
  CallBackSerch(value: string) {
    let form = new FormData();
    form.append('name', value);
    this.productService.getProductSearch(form).subscribe((response) => {
      if (response.length == 0) {
        this.isVisilible = false;
        return;
      }
      this.listProduct = response;
    });
  }
  generateUuidFromString(text: string): string {
    return uuidv5(text, this.namespace);
  }

  Search() {
    this.isVisilible = false;
    this.IsChange();
  }

  IsChange() {
    const urlSearch: string = this.generateUuidFromString(
      this.inputControl.value
    );
    this.uuidMap[urlSearch] = this.inputControl.value;
    localStorage.setItem('keySearch', JSON.stringify(this.uuidMap));
    this.router.navigate([`/shop/${urlSearch}`]);
  }
  CountItemInCart() {
    try {
      let idUser: number | null = Number(localStorage.getItem('idUser'));
      let listLast: cartLocal[] = [];
      if (!idUser) {
        listLast = this.GetLocalCart(`cart`);
      } else {
        listLast = this.GetLocalCart(`cart${idUser}`);
      }
      this.countItem = listLast.length;
      this.SetTime(idUser);
    } catch (error) {
      console.error(error);
    }
  }

  GetLocalCart(key: string): cartLocal[] {
    const local = localStorage.getItem(key);
    if (!local) {
      return [];
    }
    return JSON.parse(local);
  }

  CountItemById(id: number) {
    this.cartService.getDataByIdToken(id).subscribe((response) => {
      this.countItem = response.length;
    });
  }
  GetInformation() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.getData(id).subscribe((response) => {
      this.infomation = response;
      this.IsRoles(response.role, id);
    });
  }

  SetTime(id: number) {
    let key: string = '';
    if (!id) {
      key = `cart`;
    } else {
      key = `cart${id}`;
    }
    setInterval(() => {
      const local = localStorage.getItem(key);
      if (!local) {
        this.countItem = 0;
      } else {
        let list: cartLocal[] = JSON.parse(local);
        this.countItem = list.length;
      }
    }, 1000);
  }

  IsRoles(role: boolean, id: number) {
    if (!role) {
      return;
    }
    if (role) {
      this.ngZone.run(() => {
        this.router.navigate(['/admin/product']);
        return;
      });
    }
  }

  Logout() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.removeItemToken(id).subscribe((response) => {
      if (response.code == 200) {
        localStorage.removeItem('idUser');
        window.location.reload();
      }
    });
  }

  ProductHome(id: string) {
    this.isVisilible = false;
    let encodingid: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(encodingid, id);
      this.router.navigate([`product-home/${encodingid}`]);
    }
  }
}
