import { FormControl } from "@angular/forms"

interface cartRequest {
    idProduct: string,
    idUser: number
}

interface cartNotIdUser {
    id: number,
    name: string,
    quantity: number,
    price: number,
    voucher: number,
    image: string,
    idProduct: string,
}

interface cartLocal {
    id: string,
    name: string,
    quantity: number,
    price: number,
    voucher: number,
    image: string,
    idUser: number,
}

interface oderITem {
    idProduct: string,
    quantity: number,
}

interface order {
    idUser: number,
    address: string,
    note: string,
    items: oderITem[]
}
interface valueFormCart {
    fullname: string;
    phone: string;
    address: string;
    note: string;
}
export { cartRequest, oderITem, order, cartNotIdUser, cartLocal, valueFormCart }