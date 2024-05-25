import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../service/order.service';
import { cancelRequest, orderAdminDTOs, orderAdminResponse } from '../../../model/order.model';
import { _order } from '../../../involvement/order.involvement';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-checker-order',
  templateUrl: './admin-checker-order.component.html',
  styleUrl: './admin-checker-order.component.scss'
})
export class AdminCheckerOrderComponent implements OnInit {

  constructor(
    private orderService: OrderService, 
    private _formBuilder: FormBuilder,
  ) { }

  order: orderAdminDTOs[] = []

  orderItem: orderAdminResponse = _order.handelNew();
  
  isVisibilityForm : boolean = false;

  isLoading : number = 1;

  CancelOrder = this._formBuilder.group({
    why: ['', Validators.required],
  })
  
  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    this.orderService.getDataAdmin(1).subscribe((response) => {
      this.order = response;
    })
  }

  IsHandleOrder(id: string) {
    this.isLoading = 0;
    this.orderService.UpdateStatus(id).subscribe((response) => {
      if (response.code == 200) {
        this.isLoading = response.code ;
        alert('Xác nhận đơn hàng thành công');
        this.LoadPage();
        return;
      }
      alert('Xác nhận đơn hàng thất bại');
    })
  }

    // lấy thông tin đơn hàng 
    GetOrderById(id: string , type : number) {
      if ( type == 1){
        this.isVisibilityForm = true;
      }
      else{
        this.isVisibilityForm = false;
      }
      this.orderService.getDataById(id).subscribe((response) => {
        this.orderItem = response;
      })
    }

    // hủy đơn hàng
    CancelClick(id: string) {
      if(!this.CancelOrder.value.why){
        alert('bạn chưa nhập lý do hủy đơn hàng');
        return;
      }
      this.isLoading = 0;
      const request: cancelRequest = _order.ConvertCancel(id, this.CancelOrder.value.why as string);
      this.orderService.cancelOder(request).subscribe((response) => {
        if (response.code == 200) {
          this.isLoading == response.code
          alert('Hủy đơn hàng thành công');
          this.LoadPage();
          window.location.reload();
          return
        }
        this.isLoading = 1;
        alert("Hủy đơn thất bại");
      })
    }
}
