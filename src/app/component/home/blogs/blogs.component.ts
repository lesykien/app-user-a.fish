import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../service/blogs.service';
import { BlogsResponse, CategorisBlog } from '../../../model/blogs.model';
import { v5 as uuidv5 } from 'uuid';
import { Router } from '@angular/router';
import { involvement } from '../../../involvement/api.involvement';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
})
export class BlogsComponent implements OnInit {
  constructor(private _blogs: BlogsService, private router: Router) {}
  transForm: number = 0;
  listCategory: CategorisBlog[] = [];
  listBlogs: BlogsResponse[] = [];
  IsSlider: BlogsResponse[] = [];
  isActive: number = 0;
  activeSlider: number = 0;
  ngOnInit(): void {
    this.LoadCategory();
    this.LoadBlogs(this.isActive);
  }
  LoadBlogs(id: number) {
    this._blogs.getAllBlogs(id).subscribe((response) => {
      this.listBlogs = response;
    });
    this.LoadSlider(id)
  }
  LoadSlider(id: number) {
    this._blogs.getAllBlogs(id).subscribe((response) => {
      this.IsSlider =
        response.length >= 3
          ? response.slice(0, 4)
          : response.slice(0, response.length);
      this.activeSlider = this.IsSlider[0].id;
    });
  }

  LoadCategory() {
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.listCategory = response;
    });
  }
  ChangeUrl(id: number) {
    let url: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(url, String(id));
      this.router.navigate([`blog-detal/${url}`]);
    }
  }
  generateUuidFromString(id: number): string {
    return uuidv5(String(id), involvement.namespace);
  }

  // ChangeListCart(trasn: number, type: string) {
  //   if (type === 'minius') {
  //     this.transForm = trasn + 390 + 24;
  //     return;
  //   }
  //   this.transForm = trasn - 390 - 24;
  // }
}
