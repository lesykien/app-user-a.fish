import { Component, OnInit } from '@angular/core';
import { v5 as uuidv5 } from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';
import { BlogDTOs, _blogsGender } from '../../../model/blogs.model';

@Component({
  selector: 'app-blog-detal',
  templateUrl: './blog-detal.component.html',
  styleUrl: './blog-detal.component.scss',
})
export class BlogDetalComponent implements OnInit {
  constructor(
    private pramaster: ActivatedRoute,
    private _blogs: BlogsService
  ) {}
  blog: BlogDTOs = _blogsGender.InitialiBlogsDTO();
  category: string = '';
  ngOnInit(): void {
    this.LoadPage();
  }
  LoadPage() {
    let encodingid: string = this.pramaster.snapshot.params['id'];
    let id: number = Number(sessionStorage.getItem(encodingid));
    this.GetItemById(id);
  }

  GetItemById(id: number) {
    this._blogs.getBlogsByIdAsync(id).subscribe((response) => {
      this.blog = response;
      this.GetCategory(response.idBlogCategory)
    });
  }
  GetCategory(id : number){
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.category = response.find(a => a.id == id)?.name as string;
    })
  }
}
