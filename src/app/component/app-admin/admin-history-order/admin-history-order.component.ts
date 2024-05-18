import { Component, OnInit } from '@angular/core';
import { orderAdminDTOs, orderAdminResponse } from '../../../model/order.model';
import { OrderService } from '../../../service/order.service';
import { response } from 'express';
import { _order } from '../../../involvement/order.involvement';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-admin-history-order',
  templateUrl: './admin-history-order.component.html',
  styleUrl: './admin-history-order.component.scss',
})
export class AdminHistoryOrderComponent implements OnInit {
  constructor(private orderService: OrderService) {}

  orderItem: orderAdminResponse = _order.handelNew();
  inputControl = new FormControl();

  order: orderAdminDTOs[] = [];

  ngOnInit(): void {
    this.LoadPage();
    this.ChangeSearch();
  }

  LoadPage() {
    this.orderService.getDataAdmin(3).subscribe((response) => {
      this.order = response;
    });
  }

  ChangeSearch() {
    this.orderService.getDataAdmin(3).subscribe((response) => {
      this.inputControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          const convert = (input: string) => input.trim().toUpperCase();
          const searchTerm = convert(value);
          const list: orderAdminDTOs[] = response.filter(
            (a) =>
              convert(a.id).includes(searchTerm) ||
              convert(a.phone).includes(searchTerm) ||
              convert(a.data).includes(searchTerm)
          );
          this.order = list;
        });
    });
  }

  IsHandleOrder(id: string) {
    this.orderService.UpdateStatus(id).subscribe((response) => {
      if (response.code == 200) {
        alert('Xác nhận đơn hàng thành công');
        this.LoadPage();
        return;
      }
      alert('Xác nhận đơn hàng thất bại');
    });
  }

  // lấy thông tin đơn hàng
  GetOrderById(id: string) {
    this.orderService.getDataById(id).subscribe((response) => {
      this.orderItem = response;
    });
  }
}
