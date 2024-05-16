import { Component, OnInit } from '@angular/core';
import { HomeInvolvement } from '../../involvement/home.involvement';
import { involvement } from '../../involvement/api.involvement';
import { ProductService } from '../../service/product.service';
import { response } from 'express';
import { CartService } from '../../service/cart.service';
import { AccountService } from '../../service/account.service';
import { Subscription } from 'rxjs';
import { cartLocal } from '../../model/cart.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  ImageLogo: string = involvement.logo;
  nameUser: string = '';
  countItem: number = 0;
  listProduct!: any;
  infomation: any = null;
  constructor(
    private cartService: CartService,
    private accountService: AccountService
  ) { }

  ngOnInit(): void {
    this.CountItemInCart();
    this.GetInformation();
  }
  CountItemInCart() {
    const local = localStorage.getItem('cart');
    if (!local) {
      return;
    }
    else {
      let idUser: number = Number(sessionStorage.getItem('idUser'));
      let listLast: cartLocal[] = [];

      if (!idUser) {
        listLast = this.GetLocalCart(`cart`);
      }
      else {
        listLast = this.GetLocalCart(`cart${idUser}`);
      }
      this.countItem = listLast.length;
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
    this.cartService.getDataByIdToken(id).subscribe(response => {
      this.countItem = response.length;
    })
  }
  GetInformation() {
    let id: number = Number(sessionStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.getData(id).subscribe(response => {
      this.infomation = response;
    })
  }

  Logout() {
    let id: number = Number(sessionStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.removeItemToken(id).subscribe(response => {
      if (response.code == 200) {
        sessionStorage.removeItem('idUser');
        window.location.reload();
      }
    })
  }
}

