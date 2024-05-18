import { Component, OnInit } from '@angular/core';
import { cancelRequest, orderAdminDTOs, orderAdminResponse } from '../../../model/order.model';
import { OrderService } from '../../../service/order.service';
import { FormBuilder, Validators } from '@angular/forms';
import { _order } from '../../../involvement/order.involvement';

@Component({
  selector: 'app-admin-shipping-order',
  templateUrl: './admin-shipping-order.component.html',
  styleUrl: './admin-shipping-order.component.scss'
})
export class AdminShippingOrderComponent implements OnInit {
  constructor(
    private orderService: OrderService, 
    private _formBuilder: FormBuilder,
  ) { }

  order: orderAdminDTOs[] = []

  orderItem: orderAdminResponse = _order.handelNew();

  isVisibilityForm : boolean = false;

  CancelOrder = this._formBuilder.group({
    why: ['', Validators.required],
  })

  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    this.orderService.getDataAdmin(2).subscribe((response) => {
      this.order = response;
    })
  }

  IsHandleOrder(id: string) {
    this.orderService.UpdateStatus(id).subscribe((response) => {
      if (response.code == 200) {
        alert('Xác nhận đơn hàng thành công');
        this.LoadPage();
        return;
      }
      alert('Xác nhận đơn hàng thất bại');
    })
  }
  // lấy thông tin đơn hàng 
  GetOrderById(id: string, type: number) {
    if (type == 1) {
      this.isVisibilityForm = true;
    }
    else {
      this.isVisibilityForm = false;
    }
    this.orderService.getDataById(id).subscribe((response) => {
      this.orderItem = response;
    })
  }

  // hủy đơn hàng
  CancelClick(id: string) {
    if (!this.CancelOrder.value.why) {
      alert('bạn chưa nhập lý do hủy đơn hàng');
      return;
    }
    const request: cancelRequest = _order.ConvertCancel(id, this.CancelOrder.value.why as string);
    this.orderService.cancelOder(request).subscribe((response) => {
      if (response.code == 200) {
        alert('Hủy đơn hàng thành công');
        this.LoadPage();
        window.location.reload();
        return
      }
    })
  }
}
