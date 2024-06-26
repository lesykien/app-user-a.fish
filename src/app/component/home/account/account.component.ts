import { Component, NgZone, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { Router } from '@angular/router';
import { AccountService } from '../../../service/account.service';
import { userModel } from '../../../model/user.model';
import { user } from '../../../involvement/user.involvement';
import { itemAbout } from '../../../model/about.model';
import { ProductService } from '../../../service/product.service';
import { product, productAdminResponse } from '../../../model/products.model';
import { FormBuilder, Validators } from '@angular/forms';
import { involvement } from '../../../involvement/api.involvement';
import { v5 as uuidv5 } from 'uuid';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss',
})
export class AccountComponent implements OnInit {
  constructor(
    private orderService: OrderService,
    private ngZone: NgZone,
    private router: Router,
    private accountService: AccountService,
    private _product: ProductService, 
    private form : FormBuilder
  ) {}
  list: number[] = [1, 1, 1, 1, 1];
  openCart1: boolean = true;
  countItem: number = 0;
  userId: userModel = user.Convert();
  listAbout: product[] = [];
  isPopup = false;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      this.LoadPage();
      this.GetAbout();
    }
  }

  openPopup(){
    this.isPopup = true;
  }

  LoadPage() {
    if (typeof window !== 'undefined' && window.localStorage) {
      let id: number = Number(localStorage.getItem('idUser'));
      if (!id) {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
        return;
      }
      this.orderService.countItem(id).subscribe((response) => {
        this.countItem = response.code;
      });

      this.GetUserById(id);
    }
  }
  GetUserById(id: number) {
    this.accountService.getData(id).subscribe((response) => {
      this.userId = response;
    });
  }

  GetAbout() {
    let local = localStorage.getItem('about');
    if (!local) {
      return;
    }
    let about: itemAbout = JSON.parse(local);
    this._product.getAboutUser(about.id).subscribe((response) => {
      if (response.length == 0) {
        return;
      }
      this.listAbout = response
    });
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

    // router -> product detal
    generateUuidFromString(id: string): string {
      return uuidv5(id, involvement.namespace);
    }
    ProductHome(id: string) {
      let encodingid: string = this.generateUuidFromString(id);
      if (typeof window !== 'undefined' && window.sessionStorage) {
        sessionStorage.setItem(encodingid , id);
        this.router.navigate([`product-home/${encodingid}`])
      }
    }
}
