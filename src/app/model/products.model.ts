import { ImagesResponse } from "./image.model"

interface product {
    id: string,
    name: string,
    price: number,
    image: string,
    status: boolean,
    voucher: number
}

// product ussing in page shop
interface productsUserShop {
    id: string,
    name: string,
    description: string,
    image: string,
    price: number,
    voucher: number
}
// product ussing in page shop

// product using admin function create new item 
interface productRequest {
    id: string | null,
    name: string,
    price: string,
    images: File[],
    idCategory: any,
    description: string,
    voucher: string
}
// product using admin function create new item 

// product using of function update item
interface productAdminResponse {
    id: string,
    name: string,
    price: number,
    images: ImagesResponse[],
    status: boolean,
    vourcher: number,
    description: string,
    idCategory: number
}
// product using of function update item



export { product, productsUserShop, productRequest, productAdminResponse }