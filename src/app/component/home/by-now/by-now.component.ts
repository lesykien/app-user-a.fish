import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { productGeneral } from '../../../involvement/product.involvement';
import { productAdminResponse } from '../../../model/products.model';
import { ImagesResponse } from '../../../model/image.model';
import { AccountService } from '../../../service/account.service';
import { oderITem, order, valueFormCart } from '../../../model/cart.model';
import { _cart } from '../../../involvement/cart.involvement';
import { OrderService } from '../../../service/order.service';
import { payRequest } from '../../../model/order.model';

@Component({
  selector: 'app-by-now',
  templateUrl: './by-now.component.html',
  styleUrl: './by-now.component.scss',
})
export class ByNowComponent implements OnInit {
  constructor(
    private _product: ProductService,
    private pramaster: ActivatedRoute,
    private _formBuilder: FormBuilder,
    private _account: AccountService,
    private _order: OrderService,
    private router: Router
  ) {}
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

  items: productAdminResponse = productGeneral.ConvertProductResponse();
  images: string[] = [];
  quantity: number = 1;
  ngOnInit(): void {
    this.LoadPage();
    this.GetInformation();
  }
  LoadPage() {
    let encodingid: string = this.pramaster.snapshot.params['id'];
    let id: string = sessionStorage.getItem(encodingid) as string;
    this._product.getDataByIdAdmin(id).subscribe((response) => {
      this.items = response;
      this.ImagesConvert(response.images);
    });
  }

  ImagesConvert(imagesList: ImagesResponse[]) {
    for (let i = 0; i <= 2; i++) {
      this.images.push(imagesList[i].image);
    }
  }

  GetInformation() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) return;
    this._account.getData(id).subscribe((response) => {
      this.informationDelivery.get('fullname')!.setValue(response.fullName);
      this.informationDelivery.get('phone')!.setValue(response.phone);
      this.informationDelivery.get('address')!.setValue(response.adress);
    });
  }

  ByNow() {
    let id: number = Number(localStorage.getItem('idUser'));
    if (!id) {
      alert('Bạn phải đăng nhập mới có thể đặt hàng');
      return;
    }
    let valueForm: valueFormCart = this.informationDelivery
      .value as valueFormCart;
    let listItem: oderITem[] = this.ConvertItem(this.items);
    let informationOrder = _cart.HadleOder(id, listItem, valueForm);

    this._order.create(informationOrder).subscribe((response) => {
      if (response.code != 500) {
        let isOrder = confirm('Bạn có muốn thanh toán cho sản phẩm này khong');
        if (isOrder) {
          let request: payRequest = {
            id: response.message,
            amount: response.code,
          };
          this._order.payLoad(request).subscribe((response1) => {
            if (response1.code == 200) {
              window.location.href = response1.message;
            }
          });
        } else {
          alert('Đặt hàng thành công');
          this.router.navigate(['user-order']);
        }
      }
    });
  }

  ConvertItem(product: productAdminResponse): oderITem[] {
    let list: oderITem[] = [];
    let item: oderITem = {
      idProduct: product.id,
      quantity: this.quantity,
    };
    list.push(item);
    return list;
  }

  IsChangeQuantity(quantityBefore: number, status: string) {
    if (status == 'plus') {
      if (quantityBefore < 9) {
        this.quantity = quantityBefore + 1;
      }
    } else {
      if (quantityBefore > 1) {
        this.quantity = quantityBefore - 1;
      }
    }
  }
}
