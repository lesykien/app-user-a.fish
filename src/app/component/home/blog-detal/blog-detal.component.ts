import { Component, HostListener, OnInit } from '@angular/core';
import { v5 as uuidv5 } from 'uuid';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlogsService } from '../../../service/blogs.service';
import {
  BlogDTOs,
  BlogsResponse,
  _blogsGender,
} from '../../../model/blogs.model';
import { involvement } from '../../../involvement/api.involvement';

@Component({
  selector: 'app-blog-detal',
  templateUrl: './blog-detal.component.html',
  styleUrl: './blog-detal.component.scss',
})
export class BlogDetalComponent implements OnInit {
  constructor(
    private pramaster: ActivatedRoute,
    private _blogs: BlogsService,
    private router: Router
  ) {}
  blog: BlogDTOs = _blogsGender.InitialiBlogsDTO();
  listBlogs: BlogsResponse[] = [];
  category: string = '';
  isBtnTop: boolean = false;
  ngOnInit(): void {
    this.router.events.subscribe((envent) => {
      if (envent instanceof NavigationEnd) {
        this.LoadPage();
      }
    });
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
      this.GetCategory(response.idBlogCategory);
      this.LoadBlogs(response.idBlogCategory, id);
    });
  }
  LoadBlogs(id: number, idBlog: number) {
    this._blogs.getAllBlogs(id).subscribe((response) => {
      let list: BlogsResponse[] = response.filter((a) => a.id != idBlog);

      this.listBlogs =
        list.length >= 2 ? list.slice(0, 3) : list.slice(0, list.length);
    });
  }
  GetCategory(id: number) {
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.category = response.find((a) => a.id == id)?.name as string;
    });
  }

  ChangeUrl(id: number) {
    this.LoadPage();
    let url: string = this.generateUuidFromString(id);
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem(url, String(id));
      this.router.navigate([`blog-detal/${url}`]);
    }
  }
  generateUuidFromString(id: number): string {
    return uuidv5(String(id), involvement.namespace);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  // bắt sự kiện scroll của windown
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(event: Event): void {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 400) {
      this.isBtnTop = true;
    } else {
      this.isBtnTop = false;
    }
  }
}
