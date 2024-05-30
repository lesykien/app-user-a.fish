import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../../service/blogs.service';
import {
  BlogsRequest,
  BlogsResponse,
  CategorisBlog,
  _blogsGender,
} from '../../../model/blogs.model';
import { FormBuilder, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.scss',
})
export class AddBlogComponent implements OnInit {
  constructor(private _blogs: BlogsService, private form: FormBuilder) {}

  BLogsForm = this.form.group({
    title: [
      '',
      [
        Validators.required,
        Validators.pattern('^[^@$#%^&*\\-={}\\[\\]|\\\\:;"\'<>./?~!]+$'),
      ],
    ],
    file: ['', Validators.required],
    category: ['', Validators.required],
    content: ['', Validators.required],
  });
  listCategorisBlog: CategorisBlog[] = [];
  listBlogs: BlogsResponse[] = [];
  imageUrls: { url: string; file: File | undefined } = {
    url: '',
    file: undefined,
  };

  ngOnInit(): void {
    this.LoadCategorisBlogs();
  }

  LoadCategorisBlogs() {
    this._blogs.getCategorisBlog().subscribe((response) => {
      this.listCategorisBlog = response;
      this.BLogsForm.get('category')!.setValue(response[0]?.id.toString());
    });
  }
  SumbitForm() {
    let formValue: BlogsRequest = this.BLogsForm
      .value as unknown as BlogsRequest;
    let form = _blogsGender.ConvertRequest(formValue, this.imageUrls.file);
    this._blogs.create(form).subscribe((response) => {
      if (response.code == 200) {
        alert('thêm blog thành công');
        window.location.reload();
        return;
      }
      alert('Thêm blog thất bại');
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
