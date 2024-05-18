import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss',
})
export class AdminHomeComponent implements OnInit {
  constructor(
    private _router: ActivatedRoute,
    private productService: ProductService
  ) {}
  productResponse: product[] = [];
  id!: string;
  isTypePopup: boolean = true;
  titlePopup: string = 'Thêm thông tin sản phẩm';
  inputControl = new FormControl();

  ngOnInit(): void {
    this.id = this._router.snapshot.params['id'];
    this.productService.getData().subscribe((response) => {
      this.productResponse = response;
    });
    this.ChangeSearch();
  }

  ChangeSearch() {
    this.productService.getData().subscribe((response) => {
      this.inputControl.valueChanges
        .pipe(debounceTime(200))
        .subscribe((value) => {
          const convert = (input: string) => input.trim().toUpperCase();
          const searchTerm = convert(value);
          const list: product[] = response.filter(
            (a) =>
              convert(a.id).includes(searchTerm) ||
              convert(a.name).includes(searchTerm)
          );
          this.productResponse = list;
        });
    });
  }

  openPopup(id: string) {
    if (id != 'add') {
      this.titlePopup = 'Cập nhật thông tin sản phẩm';
      this.isTypePopup = false;
      sessionStorage.setItem('keyId', id);
    } else {
      this.isTypePopup = true;
      this.titlePopup = 'Thêm thông tin sản phẩm';
    }
  }
  Isreload() {
    this.isTypePopup = true;
  }
}
