import { Component, OnInit } from '@angular/core';
import { oderITem, order } from '../../../model/cart.model';
import { cancelRequest, oderUser, orderAdminDTOs, orderAdminResponse } from '../../../model/order.model';
import { _order } from '../../../involvement/order.involvement';
import { OrderService } from '../../../service/order.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-order',
  templateUrl: './user-order.component.html',
  styleUrl: './user-order.component.scss'
})
export class UserOrderComponent implements OnInit {
  constructor(
    private oderService: OrderService,
    private _formBuilder: FormBuilder,
  ) { }
  listOder: orderAdminDTOs[] = []
  itemOder: orderAdminResponse = _order.handelNew();
  id: string = "0";
  status: number = 5;
  isBtn: number = 1;

  CancelOrder = this._formBuilder.group({
    why: ['', Validators.required],
  })

  title : string = "";

  ngOnInit(): void {
    this.LoadingPage(1);
  }

  LoadingPage(status: number) {
    this.isBtn = status
    const request: oderUser = _order.ConvertRequest(status);
    this.oderService.getDataByIdUser(request).subscribe((response) => {
      this.listOder = response;

      if(response.length == 0) return;
      
      this.GetDataId(response[0].id, response[0].delivery);
    })
  }

  GetDataId(id: string , status: number) {
    this.id = id;
    this.status = status
    this.title = _order.IstitleStatus(status)
    this.oderService.getDataById(id).subscribe((response) => {
      this.itemOder = response;
    })
  }

  CancelClick(id: string) {
    const request: cancelRequest = _order.ConvertCancel(id, this.CancelOrder.value.why as string);

    this.oderService.cancelOder(request).subscribe((response) => {
      if (response.code == 200) {
        alert('Hủy đơn hàng thành công');
        this.LoadingPage(1);
        window.location.reload();
        return
      }
    })
  }
}