import { FormGroup } from "@angular/forms";
import { loginRequest } from "../model/login.model";
import { productRequest } from "../model/products.model";

export class productGeneral {
    constructor() { }
    // get values from input
    static getFormValue(group: FormGroup, controlName: string): string {
        return group.get(controlName)?.value ?? '';
    }
    // get values from input

    // convert information form enter object login request
    static convertData(name: string, price: string, voucher: string, description: string, category: any): FormData {
        let form = new FormData;
        form.append('name', name);
        form.append('price', price);
        form.append('vourcher', voucher);
        form.append('description', description);
        form.append('idcategory', category);
        return form;
    }
    // convert information form enter object login request

    static convertDataUpdate(name: string, price: string, voucher: string, description: string, category: any, images: File[], id: string | null): productRequest {
        return {
            id: id,
            name: name,
            price: price,
            voucher: voucher,
            idCategory: category,
            images: images,
            description: description
        }
    }
}