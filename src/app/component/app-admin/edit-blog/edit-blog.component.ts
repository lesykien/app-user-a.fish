import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../service/blogs.service';
import { FormBuilder, Validators } from '@angular/forms';
import {
  CategorisBlog,
  BlogsResponse,
  BlogDTOs,
  _blogsGender,
  BlogsRequest,
} from '../../../model/blogs.model';
import { response } from 'express';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.scss',
})
export class EditBlogComponent implements OnInit {
  constructor(private _blogs: BlogsService, private form: FormBuilder) {}
  BLogsForm = this.form.group({
    id: [''],
    title: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^@$#%^&*\\-={}\\[\\]|\\\\:;"\'<>./?~!]+$'),
      ],
    ],
    file: [''],
    category: ['', Validators.required],
    content: ['', Validators.required],
  });
  listCategorisBlog: CategorisBlog[] = [];
  itemBlog: BlogDTOs = _blogsGender.InitialiBlogsDTO();
  imageUrls: { url: string; file: File | undefined } = {
    url: '',
    file: undefined,
  };
  ngOnInit(): void {
    this.LoadPage();
  }
  LoadPage() {
    let id: number = Number(sessionStorage.getItem('keyblog'));
    if (id) {
      this._blogs.getBlogsByIdAsync(id).subscribe((response) => {
        this.itemBlog = response;
        this.LoadOption(response);
      });
    }
  }
  LoadOption(item: BlogDTOs) {
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.listCategorisBlog = response;
      this.BLogsForm.get('category')!.setValue(item.idBlogCategory.toString());
    });
    this.BLogsForm.get('content')!.setValue(item.content.toString());
    this.BLogsForm.get('title')!.setValue(item.title.toString());
    this.BLogsForm.get('id')!.setValue(item.id.toString());
  }

  SumbitForm() {
    let isChecker: boolean = confirm('Bạn có muốn cập nhật bài viết này không');
    if (!isChecker) {
      return;
    }
    let formValue: BlogsRequest = this.BLogsForm
      .value as unknown as BlogsRequest;
    let form: FormData = _blogsGender.ConvertRequest(
      formValue,
      this.imageUrls.file
    );
    form.append('id', String(this.BLogsForm.value.id));
    this._blogs.update(form).subscribe((response) => {
      if (response.code == 200) {
        window.location.reload();
      }
    });
  }

  onFilesSelected(event: any) {
    this.imageUrls = {
      url: '',
      file: undefined,
    };
    let files: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imageUrls = {
        url: reader.result as string,
        file: files,
      };
    };
    reader.readAsDataURL(files);
  }
}
