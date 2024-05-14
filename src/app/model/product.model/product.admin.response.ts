import { ImagesResponse } from "../images.model/image.response";

export interface productAdminResponse {
    id: string,
    name: string,
    price: number,
    images: ImagesResponse[],
    status: boolean,
    vourcher: number,
    description : string , 
    idCategory : number
}