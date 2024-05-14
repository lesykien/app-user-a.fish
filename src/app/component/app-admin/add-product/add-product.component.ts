import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { productGeneral } from '../../../involvement/product.involvement';
import { ProductService } from '../../../service/product.service';
import { CategoryService } from '../../../service/category.service';
import { category } from '../../../model/category.model/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private productSevice: ProductService,
    private categoryService: CategoryService
  ) { }
  imageUrls: { url: string, index: number, file: File }[] = [];
  // create form add item
  addItem = this.formBuilder.group({
    name: ['adsad1', Validators.required],
    price: ['1', Validators.required],
    voucher: ['1', Validators.required],
    description: ['1', Validators.required],
    category: ['', Validators.required],
  });

  options: category[] = [];
  selectedOption: any;
  // create form add item
  sumbitForm() {
    const name = productGeneral.getFormValue(this.addItem, 'name');
    const price = productGeneral.getFormValue(this.addItem, 'price');
    const voucher = productGeneral.getFormValue(this.addItem, 'voucher');
    const description = productGeneral.getFormValue(this.addItem, 'description');
    const category = this.addItem.get('category')?.value; // lấy id category

    let form = productGeneral.convertData(name, price, voucher, description, category);
    for (let item of this.imageUrls) {
      form.append('files', item.file);
    }
    this.productSevice.addItem(form).subscribe(response => {
      if ( response.code == 200){
        window.location.reload();
      }
    })
  }
  // Lấy thông tin hình ảnh
  onFilesSelected(event: any) {
    this.imageUrls = [];
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageUrls.push({ url: reader.result as string, index: i, file: file });
      };
      reader.readAsDataURL(file);
    }
  }
  // Lấy thông tin hình ảnh
  RemoveItem(index: number) {
    this.imageUrls = this.imageUrls.filter((_, i) => i !== index);
  }
  ngOnInit(): void {
    this.categoryService.getData().subscribe(response => {
      this.options = response;
      this.addItem.get('category')!.setValue(this.options[0]?.id.toString());
    })
  }

}
