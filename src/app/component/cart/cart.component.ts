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
import { JsonPipe } from '@angular/common';
import { payRequest } from '../../model/order.model';
import { Router } from 'express';

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

  isRexgeFullName: string =
    '^[A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*(?:[ ][A-ZÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ][a-zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]*)*$';

  informationDelivery = this._formBuilder.group({
    fullname: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern(this.isRexgeFullName),
      ],
    ],
    phone: [
      '',
      [
        Validators.required,
        Validators.maxLength(10),
        Validators.minLength(10),
        Validators.pattern('^[0-9]+$'),
      ],
    ],
    address: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^@$#%^&*()\\-+={}\\[\\]|\\\\:;"\'<>.?~!]+$'),
      ],
    ],
    note: [''],
  });

  infomation: any = null;

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.GetInformation();
      this.LoadCartNotUser();
    }
  }

  // lấy thông tin giỏ hàng
  LoadCartNotUser() {
    const local = localStorage.getItem('cart');
    if (!local) {
      return;
    } else {
      let idUser: number = Number(localStorage.getItem('idUser'));
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
    let idUser: number = Number(localStorage.getItem('idUser'));
    if (!idUser) {
      this.RemoveCartItemInList(`cart`, item);
      this.LoadCartNotUser();
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
      this.total += item.quantity * (item.price - item.voucher);
      this.provisionnal += item.quantity * item.price;
      this.voucher += item.voucher * item.quantity;
    }
  }
  GetInformation() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) return;
    this.accountService.getData(id).subscribe((response) => {
      this.infomation = response;
      this.informationDelivery.get('fullname')!.setValue(response.fullName);
      this.informationDelivery.get('phone')!.setValue(response.phone);
      this.informationDelivery.get('address')!.setValue(response.adress);
    });
  }
  SumbitForm() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) {
      alert('Bạn phải đăng nhập mới có thể đặt hàng');
      return;
    }
    let valueForm: valueFormCart = this.informationDelivery
      .value as valueFormCart;
    let listItem = this.HandleItemCart(id);
    let informationOrder = _cart.HadleOder(id, listItem, valueForm);

    this.orderService.create(informationOrder).subscribe((response) => {
      if (response.code != 500) {
        let isCheck = confirm('Bạn có muốn thanh toán không');
        localStorage.removeItem(`cart${id}`);
        if (isCheck) {
          let request: payRequest = {
            id: response.message,
            amount: response.code,
          };
          this.orderService.payLoad(request).subscribe((response1) => {
            if (response1.code == 200) {
              window.location.href = response1.message;
            }
          });
        } else {
          window.location.reload();
        }
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

  IsChangeQuantity(status: boolean, id: string) {
    let idUser: string | null = localStorage.getItem('idUser');
    if (idUser) {
      this.ChangeQuantity(`cart${idUser}`, id, status);
    } else {
      this.ChangeQuantity(`cart`, id, status);
    }
    this.LoadCartNotUser();
  }

  ChangeQuantity(key: string, id: string, status: boolean) {
    let local = localStorage.getItem(key);
    let list: cartLocal[] = [];
    if (local) {
      list = JSON.parse(local);
      const item: cartLocal | undefined = list.find((a) => a.id == id);
      if (item) {
        let quantityBefore = item.quantity;
        if (status) {
          if (item.quantity < 9) {
            item.quantity = quantityBefore + 1;
            list = this.UpdateQuantiyt(item.quantity, id, list);
            localStorage.setItem(key, JSON.stringify(list));
          }
        } else {
          if (item.quantity > 1) {
            item.quantity = quantityBefore - 1;
            list = this.UpdateQuantiyt(item.quantity, id, list);
            localStorage.setItem(key, JSON.stringify(list));
          }
        }
      }
    }
  }
  UpdateQuantiyt(quantity: number, id: string, list: cartLocal[]): cartLocal[] {
    for (let i: number = 0; i < list.length; i++) {
      if (id == list[i].id) {
        list[i].quantity = quantity;
      }
    }
    return list;
  }
}
