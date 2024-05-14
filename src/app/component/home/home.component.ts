import { Component, OnInit } from '@angular/core';
import { HomeInvolvement } from '../../involvement/home.involvement';
import { involvement } from '../../involvement/api.involvement';
import { ProductService } from '../../service/product.service';
import { response } from 'express';
import { CartService } from '../../service/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  constructor(
    private cartService: CartService
  ) { }
  ImageLogo: string = involvement.logo;
  nameUser: string = '';
  countItem: number = 0;
  listProduct!: any;
  ngOnInit(): void {
    this.nameUser = HomeInvolvement.LoadNameUser();
    this.LoadCountCarts();
    this.CountItemInCart();
  }

  CountItemInCart() {
    this.cartService.getDataNotIdUser().subscribe(response => {
      this.countItem = response.length;
    })
  }

  LoadCountCarts() {
    setInterval(() => {
      const isLoading = sessionStorage.getItem('loading');
      const isRemove = sessionStorage.getItem('remove');
      if (!isLoading && !isRemove) {
        return;
      }
      else {
        this.CountItemInCart();
        sessionStorage.removeItem('remove');
      }
    }, 1000)
  }
}

