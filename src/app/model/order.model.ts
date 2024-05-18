interface orderAdminDTOs {
    id: string,
    tatol: number,
    data: string,
    phone: string,
    delivery: number
}
interface productByOrder {
    id: string
    image: string
    name: string
    price: number
    quantity: number
    status: boolean
    voucher: number
}
interface orderAdminResponse {
    address: string
    date: string
    id: string
    phone: string
    products: productByOrder[]
    tatol: number
    fullName: string
    note: string
}

interface oderUser {
    idUser: number
    status: number
}

interface cancelRequest{
    id : string
    note : string
}

export { orderAdminDTOs, orderAdminResponse, oderUser , cancelRequest}