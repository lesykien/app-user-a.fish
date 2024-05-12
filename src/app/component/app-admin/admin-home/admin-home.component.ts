import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/product.model/products.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private _router: ActivatedRoute,
    private productService: ProductService
  ) { }
  productResponse!: product[];
  id!: string;
  isTypePopup: boolean = true;
  titlePopup: string = 'Thêm thông tin sản phẩm';
  ngOnInit(): void {
    this.id = this._router.snapshot.params['id'];
    this.productService.getData().subscribe(response => {
      this.productResponse = response;
    });
  }

  openPopup(id: string) {
    if (id != 'add') {
      this.titlePopup = 'Cập nhật thông tin sản phẩm';
      this.isTypePopup = false;
      sessionStorage.setItem('keyId', id);
    }
    else {
      this.isTypePopup = true;
      this.titlePopup = 'Thêm thông tin sản phẩm';

    }
  }
  Isreload(){
    this.isTypePopup = true;
  }

}
