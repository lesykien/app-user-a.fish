import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../service/product.service';
import { product } from '../../../model/products.model';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { config } from 'process';

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
  isCategory: boolean = false;
  titlePopup: string = 'Thêm thông tin sản phẩm';
  inputControl = new FormControl();

  isPopup: boolean = false;

  ngOnInit(): void {
    this.id = this._router.snapshot.params['id'];
    this.LoadPage();
    this.ChangeSearch();
  }

  LoadPage() {
    this.productService.getData().subscribe((response) => {
      this.productResponse = response;
    });
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
    this.isPopup = true;
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
    this.isPopup = false;
  }
  UpdateStatus(id: string) {
    const mes = confirm('Có chắc cập nhật sản phẩm không');
    if (mes) {
      this.productService.updateStatus(id).subscribe((response) => {
        if (response.code == 500) {
          alert('Cập nhật thất bại');
          window.location.reload();
          return;
        }
        window.location.reload();
      });
      return;
    }
    window.location.reload();
  }
}
