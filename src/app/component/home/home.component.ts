import { Component, NgZone, OnInit } from '@angular/core';
import { involvement } from '../../involvement/api.involvement';
import { CartService } from '../../service/cart.service';
import { AccountService } from '../../service/account.service';
import { cartLocal } from '../../model/cart.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { product } from '../../model/products.model';
import { Router } from '@angular/router';
import { _cart } from '../../involvement/cart.involvement';
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
  listProduct: product[] = [];
  inputControl = new FormControl();
  isVisilible: boolean = false;
  openCart: boolean = false;

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
    this.productService.getData().subscribe((response) => {
      this.inputControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          if (value.trim() == '') {
            this.isVisilible = false;
          } else {
            this.isVisilible = true;
          }
          const searchTerm = value.trim().toUpperCase();
          const list: product[] = response.filter((product) => {
            const nameUpper = product.name.trim().toUpperCase();
            return (
              nameUpper.includes(searchTerm) ||
              product.id.toUpperCase().includes(searchTerm) ||
              !searchTerm
            );
          });
          this.listProduct = list;
        });
    });
  }
  Search() {
    this.router.navigate([`/shop/${this.inputControl}`])
  }
  onBlur(event: FocusEvent) {
    this.isVisilible = false;
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

  ClosePopup(status: number) {
    if (status == 1) {
      this.openCart = true;
    } else if (status == 2) {
      this.openCart = false;
    }
  }

  IsRoles(role: boolean, id: number) {
    if (!role) {
      _cart.AddIdUser(id);
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
}
