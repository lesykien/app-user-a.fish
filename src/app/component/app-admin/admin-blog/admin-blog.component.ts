import { Component, OnInit } from '@angular/core';
import { BlogsResponse, CategorisBlog } from '../../../model/blogs.model';
import { BlogsService } from '../../../service/blogs.service';
import { response } from 'express';

@Component({
  selector: 'app-admin-blog',
  templateUrl: './admin-blog.component.html',
  styleUrl: './admin-blog.component.scss',
})
export class AdminBlogComponent implements OnInit {
  constructor(private _blogs: BlogsService) {}
  isPopup: boolean = false;
  isAdd: boolean = true;
  isFormOpen: number = 0;
  listBlogs: BlogsResponse[] = [];
  listCategorys: CategorisBlog[] = [];
  isActiveBtn: number = 0;
  isCategory: boolean = false;

  name: string = '';
  isBtn: boolean = true;
  isForm: boolean = false;
  id: number = 0;
  ngOnInit(): void {
    this.LoadPage(this.isActiveBtn);
  }

  LoadPage(id: number) {
    this._blogs.getAllBlogs(id).subscribe((response) => {
      this.listBlogs = response;
    });
    this.LoadCategory();
  }
  LoadCategory() {
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.listCategorys = response;
    });
  }

  EditFormBlog(id: number) {
    sessionStorage.setItem('keyblog', id.toString());
  }

  Remove(id: number) {
    let isChecker: boolean = confirm('Bạn có muốn xóa bài viết này không');
    if (!isChecker) {
      return;
    }
    this._blogs.remove(id).subscribe((response) => {
      if (response.code == 200) {
        this.LoadPage(this.isActiveBtn);
      }
    });
  }

  AddNewItem(newName: string) {
    let form = new FormData();
    form.append('name', newName);
    this._blogs.creatCategory(form).subscribe((response) => {
      if (response.code == 200) {
        this.LoadCategory();
        this.name = '';
      }
    });
  }
  RemoveItem(id: number) {
    this._blogs.getAllBlogs(id).subscribe((response) => {
      if (response.length > 0) {
        alert('Bạn không thể xóa danh mục này');
        return;
      }
      let isChecker = confirm('Bạn có muốn xóa danh mục này không');
      if (!isChecker) {
        return;
      }
      this._blogs.removeCategory(id).subscribe((response) => {
        if (response.code == 200) {
          this.LoadCategory();
        }
      });
    });
  }

  UpdateItem() {
    let isChecker = confirm('Bạn có muốn sửa danh mục này không');
    if (!isChecker) {
      return;
    }
    let item: CategorisBlog = {
      id: this.id,
      name: this.name,
    };
    this._blogs.updateCategory(item).subscribe((response) => {
      if (response.code == 200) {
        this.LoadCategory();
        this.name = '';
      }
    });
  }
}
