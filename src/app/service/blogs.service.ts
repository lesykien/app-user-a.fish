import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { involvement } from '../involvement/api.involvement';
import { BlogDTOs, BlogsResponse, CategorisBlog } from '../model/blogs.model';
import { singleResponse } from '../model/single.responser';

@Injectable({
  providedIn: 'root',
})
export class BlogsService {
  constructor(private http: HttpClient) {}

  getCategorisBlog(): Observable<CategorisBlog[]> {
    return this.http.get<CategorisBlog[]>(
      `${involvement.api}/api/Blogs/get-all-categoris`
    );
  }

  create(form: FormData): Observable<singleResponse> {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Blogs/create-blog`,
      form
    );
  }

  getAllBlogs(id: number): Observable<BlogsResponse[]> {
    return this.http.get<BlogsResponse[]>(
      `${involvement.api}/api/Blogs/get-all-blogs-${id}`
    );
  }

  getBlogsByIdAsync(id: number): Observable<BlogDTOs> {
    return this.http.get<BlogDTOs>(`${involvement.api}/api/Blogs/get-by-${id}`);
  }

  update(form: FormData): Observable<singleResponse> {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Blogs/update-blogs`,
      form
    );
  }

  remove(id: number): Observable<singleResponse> {
    return this.http.delete<singleResponse>(
      `${involvement.api}/api/Blogs/remove-item-${id}`
    );
  }

  // category blogs
  creatCategory(name: FormData): Observable<singleResponse> {
    return this.http.post<singleResponse>(
      `${involvement.api}/api/Blogs/create-category-blog`,
      name
    );
  }

  updateCategory(model: CategorisBlog): Observable<singleResponse> {
    return this.http.put<singleResponse>(
      `${involvement.api}/api/Blogs/update-category-blog`,
      model
    );
  }

  removeCategory(id: number): Observable<singleResponse> {
    return this.http.delete<singleResponse>(
      `${involvement.api}/api/Blogs/remove-category-blog-${id}`
    );
  }
}
