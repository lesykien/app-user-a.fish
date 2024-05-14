export interface productRequest {
    id: string | null,
    name: string,
    price: string,
    images: File[],
    idCategory: any,
    description: string, 
    voucher : string
}