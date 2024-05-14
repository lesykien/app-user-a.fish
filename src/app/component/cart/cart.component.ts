import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { cartNotIdUser } from '../../model/cart.model/cart-not-id-user.response';
import { log } from 'console';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService
  ) { }
  listCart: cartNotIdUser[] = [];
  total: number = 0;
  voucher: number = 0;
  provisionnal: number = 0;

  ngOnInit(): void {
    this.LoadItemCartWhenAddNew();
    this.LoadCarts();
  }

  LoadCarts() {
    this.cartService.getDataNotIdUser().subscribe(response => {
      
      this.total = 0;
      this.voucher = 0;
      this.provisionnal = 0;

      this.listCart = response;
      for (let item of response) {
        this.total = this.total + (item.quantity * (item.price - item.voucher));

        this.provisionnal = this.provisionnal + (item.quantity * item.price)

        this.voucher = this.voucher + item.voucher;
      }
    })
  }

  RemoveItemInCart(id: number) {
    this.cartService.removeItem(id).subscribe(response => {
      this.LoadCarts()
      sessionStorage.setItem('remove', '1');
    })
  }

  LoadItemCartWhenAddNew() {
    setInterval(() => {
      const isLoading = sessionStorage.getItem('loading');
      if (!isLoading) {
        return;
      }
      else {
        this.LoadCarts();
        sessionStorage.removeItem('loading')
      }
    }, 1000)
  }
}
