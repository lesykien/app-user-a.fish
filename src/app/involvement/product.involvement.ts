import { FormGroup } from '@angular/forms';
import { loginRequest } from '../model/login.model';
import {
  product,
  productAdminResponse,
  productRequest,
} from '../model/products.model';

export class productGeneral {
  constructor() {}
  // get values from input
  static getFormValue(group: FormGroup, controlName: string): string {
    return group.get(controlName)?.value ?? '';
  }
  // get values from input

  // convert information form enter object login request
  static convertData(
    name: string,
    price: string,
    voucher: string,
    description: string,
    category: any
  ): FormData {
    let form = new FormData();
    form.append('name', name);
    form.append('price', price);
    form.append('vourcher', voucher);
    form.append('description', description);
    form.append('idcategory', category);
    return form;
  }
  // convert information form enter object login request

  static convertDataUpdate(
    name: string,
    price: string,
    voucher: string,
    description: string,
    category: any,
    images: File[],
    id: string | null
  ): productRequest {
    return {
      id: id,
      name: name,
      price: price,
      voucher: voucher,
      idCategory: category,
      images: images,
      description: description,
    };
  }

  static HandleStar(): product {
    return {
      id: '',
      name: '',
      price: 0,
      image: '',
      status: false,
      voucher: 0,
    };
  }

  static ConvertProductResponse(): productAdminResponse {
    return {
      id: '',
      name: '',
      price: 0,
      images: [{ id: 0, image: '', avatar: false }],
      status: false,
      vourcher: 0,
      description: '',
      idCategory: 1,
    };
  }

  static RemoveFistItme(response: product[]): product[] {
    let list: product[] = [];
    for (let i = 1; i < response.length; i++) {
      list.push(response[i]);
    }
    return list;
  }
}
