import { Component, OnInit } from '@angular/core';
import { productAdminResponse } from '../../../model/products.model';
import { ProductService } from '../../../service/product.service';
import { stringify } from 'querystring';
import { log } from 'console';
import { ImagesResponse } from '../../../model/image.model';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryService } from '../../../service/category.service';
import { category } from '../../../model/category.model';
import { productGeneral } from '../../../involvement/product.involvement';
import { productRequest } from '../../../model/products.model';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss',
})
export class EditProductComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productSevice: ProductService
  ) {}
  data!: productAdminResponse;
  images: ImagesResponse[] = [];
  options: category[] = [];

  imageUrls: { url: string; index: number; file: File }[] = [];

  updateItem = this.formBuilder.group({
    id: [''],
    name: [
      '',
      [
        Validators.required,
        Validators.maxLength(50),
        Validators.pattern('^[^@$#%^&*\\-={}\\[\\]|\\\\:;"\'<>./?~!]+$'),
      ],
    ],
    price: [
      '',
      [
        Validators.required,
        Validators.pattern('^[1-9][0-9]*$'),
        Validators.maxLength(7),
      ],
    ],
    voucher: ['', Validators.pattern('^[0-9]+$')],
    description: ['', Validators.required],
    category: ['', Validators.required],
  });

  // validate is voucher not than price
  get isVoucherGreaterThanPrice(): boolean {
    const voucherControl = this.updateItem.get('voucher');
    const priceControl = this.updateItem.get('price');

    if (!voucherControl || !priceControl) {
      return false;
    }

    const voucherValue = Number(voucherControl.value);
    const priceValue = Number(priceControl.value);

    if (isNaN(voucherValue) || isNaN(priceValue)) {
      return false;
    }

    return voucherValue >= priceValue;
  }
  ngOnInit(): void {
    this.GetData();
    this.GetDataCategory();
  }

  GetDataCategory() {
    this.categoryService.getData().subscribe((response) => {
      this.options = response;
      this.updateItem.get('category')!.setValue(this.options[0]?.id.toString());
    });
  }

  GetData() {
    const id: string | null = sessionStorage.getItem('keyId');
    this.productService.getDataByIdAdmin(id).subscribe((response) => {
      this.images = response.images;

      this.updateItem.get('id')!.setValue(response.id.toString());
      this.updateItem.get('category')!.setValue(response.idCategory.toString());
      this.updateItem.get('name')!.setValue(response.name.toString());
      this.updateItem.get('price')!.setValue(response.price.toString());
      this.updateItem.get('voucher')!.setValue(response.vourcher.toString());
      this.updateItem
        .get('description')!
        .setValue(response.description.toString());
    });
  }

  PushImageEnterArr(): File[] {
    let files: File[] = [];
    for (var item of this.imageUrls) {
      files.push(item.file);
    }
    return files;
  }

  GetDataForm(): FormData {
    const id = productGeneral.getFormValue(this.updateItem, 'id');
    const name = productGeneral.getFormValue(this.updateItem, 'name');
    const price = productGeneral.getFormValue(this.updateItem, 'price');
    const voucher = productGeneral.getFormValue(this.updateItem, 'voucher');
    const description = productGeneral.getFormValue(
      this.updateItem,
      'description'
    );
    const category = this.updateItem.get('category')?.value; // lấy id category

    let form = productGeneral.convertData(
      name,
      price,
      voucher,
      description,
      category
    );
    form.append('id', id);
    for (let item of this.imageUrls) {
      form.append('files', item.file);
    }

    return form;
  }
  sumbitForm() {
    const request = this.GetDataForm();
    this.productSevice.updateItem(request).subscribe((response) => {
      if (response.code == 200) {
        alert('Cập nhật sản phẩm thành công');
        window.location.reload();
        return;
      }
      alert('Cập nhật sản phẩm thất bại');
    });
  }
  // Lấy thông tin hình ảnh
  onFilesSelected(event: any) {
    this.imageUrls = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({
          url: reader.result as string,
          index: i,
          file: file,
        });
      };
      reader.readAsDataURL(file);
    }
  }
  // Lấy thông tin hình ảnh
  RemoveItem(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
  }
}
