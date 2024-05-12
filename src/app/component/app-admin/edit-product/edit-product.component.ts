import { Component, OnInit } from '@angular/core';
import { productAdminResponse } from '../../../model/product.model/product.admin.response';
import { ProductService } from '../../../service/product.service';
import { stringify } from 'querystring';
import { log } from 'console';
import { ImagesResponse } from '../../../model/images.model/image.response';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.scss'
})
export class EditProductComponent implements OnInit {
  constructor(private productService: ProductService) { }
  data!: productAdminResponse;
  images : ImagesResponse[] = []
  ngOnInit(): void {
    this.GetData()
  }

  GetData() {
    const id: string | null = sessionStorage.getItem('keyId');
    this.productService.getDataByIdAdmin(id).subscribe(response => {
      this.data = response;
      this.images = response.images            
    })
  }
}
