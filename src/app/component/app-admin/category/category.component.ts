import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../service/category.service';
import { category } from '../../../model/category.model';
import { _cart } from '../../../involvement/cart.involvement';
import { response } from 'express';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
})
export class CategoryComponent implements OnInit {
  constructor(private _category: CategoryService) {}

  listCategorys: category[] = [];
  name: string = '';
  isBtn: boolean = true;
  isForm: boolean = false;
  id: number = 0;
  ngOnInit(): void {
    this.LoadPage();
  }

  LoadPage() {
    this._category.getData().subscribe((response) => {
      this.listCategorys = response;
    });
  }

  AddNewItem(newName: string) {
    let form = new FormData();
    form.append('model', newName);
    this._category.additem(form).subscribe((response) => {
      if (response.code == 200) {
        this.LoadPage();
        this.name = '';
        this.isForm = false;
      }
    });
  }

  RemoveItem(id: number) {
    let isChecker = confirm('Bạn có muốn xóa danh mục này không');
    if (isChecker) {
      this._category.getProductsByCategory(id).subscribe((response) => {
        if (response.length == 0) {
          this.RemoveInDatadase(id);
          return;
        } else {
          alert('Không thể xóa danh mục sản phẩm này');
        }
      });
    }
  }

  RemoveInDatadase(id: number) {
    this._category.removeitem(id).subscribe((response) => {
      if (response.code == 200) {
        this.LoadPage();
        this.isForm = false;
      }
    });
  }

  UpdateItem() {
    let request: category = {
      id: this.id,
      name: this.name,
    };
    this._category.updateitem(request).subscribe((response) => {
      if (response.code == 200) {
        this.LoadPage();
        this.isForm = false;
        this.name = '';
      }
    });
  }
}
