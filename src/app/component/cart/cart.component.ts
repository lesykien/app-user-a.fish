import { Component, OnInit } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { cartNotIdUser, oderITem, valueFormCart } from '../../model/cart.model';
import { log } from 'console';
import { AccountService } from '../../service/account.service';
import { FormBuilder, Validators } from '@angular/forms';
import { cartLocal } from '../../model/cart.model';
import { product } from '../../model/products.model';
import { _cart } from '../../involvement/cart.involvement';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private accountService: AccountService,
    private _formBuilder: FormBuilder,
    private orderService: OrderService
  ) {}

  listCart: cartLocal[] = [];
  total: number = 0;
  voucher: number = 0;
  provisionnal: number = 0;

  informationDelivery = this._formBuilder.group({
    fullname: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.maxLength(10)]],
    address: ['', [Validators.required]],
    note: [''],
  });

  infomation: any = null;

  ngOnInit(): void {
    this.GetInformation();
    this.LoadCartNotUser();
  }

  // lấy thông tin giỏ hàng
  LoadCartNotUser() {
    const local = localStorage.getItem('cart');
    if (!local) {
      return;
    } else {
      let idUser: number = Number(sessionStorage.getItem('idUser'));
      let listLast: cartLocal[] = [];
      if (!idUser) {
        listLast = this.GetLocalCart(`cart`);
      } else {
        listLast = this.GetLocalCart(`cart${idUser}`);
      }
      this.ConverList(listLast);
    }
  }
  GetLocalCart(key: string): cartLocal[] {
    const local = localStorage.getItem(key);
    if (!local) {
      return [];
    }
    return JSON.parse(local);
  }
  // lấy thông tin giỏ hàng

  // xóa sản phẩm ra giỏ hàng
  RemoveItem(id: string) {
    const item = this.listCart.find((a) => a.id == id);
    if (!item) {
      return;
    }

    let idUser: number = Number(sessionStorage.getItem('idUser'));
    if (!idUser) {
      this.RemoveCartItemInList(`cart`, item);
      return;
    }
    this.RemoveCartItemInList(`cart${idUser}`, item);
    this.LoadCartNotUser();
  }
  // xóa sản phẩm ra giỏ hàng

  RemoveCartItemInList(key: string, item: any) {
    this.listCart.forEach((cart) => {
      if (cart.id == item.id) {
        const index = this.listCart.indexOf(cart);
        this.listCart.splice(index, 1);
        localStorage.setItem(key, JSON.stringify(this.listCart));
      }
    });
  }

  ConverList(response: cartLocal[]) {
    this.total = 0;
    this.voucher = 0;
    this.provisionnal = 0;
    this.listCart = response;
    for (let item of response) {
      this.total = this.total + item.quantity * (item.price - item.voucher);
      this.provisionnal = this.provisionnal + item.quantity * item.price;
      this.voucher = this.voucher + item.voucher;
    }
  }
  GetInformation() {
    let id: number = Number(sessionStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.getData(id).subscribe((response) => {
      this.infomation = response;
      this.informationDelivery.get('fullname')!.setValue(response.fullName);
      this.informationDelivery.get('phone')!.setValue(response.phone);
      this.informationDelivery.get('address')!.setValue(response.adress);
    });
  }
  SumbitForm() {
    let id: number = Number(sessionStorage.getItem('idUser'));
    if (!id) {
      alert('Bạn phải đăng nhập mới có thể đặt hàng');
      return;
    }
    let valueForm: valueFormCart = this.informationDelivery
      .value as valueFormCart;
    let listItem = this.HandleItemCart(id);
    let informationOrder = _cart.HadleOder(id, listItem, valueForm);

    this.orderService.create(informationOrder).subscribe((response) => {
      if (response.code == 200) {
        alert('Đăng hàng thành công');
        localStorage.removeItem(`cart${id}`);
        window.location.reload();
      }
    });
  }
  HandleItemCart(id: number): oderITem[] {
    let listLocal: cartLocal[] = [];
    const local = localStorage.getItem(`cart${id}`);
    if (!local) {
      return [];
    }
    listLocal = JSON.parse(local);
    let listReturn: oderITem[] = _cart.ConvetOrderItem(listLocal);
    return listReturn;
  }
}
