import { numberAttribute } from "@angular/core"
import { cancelRequest, oderUser, orderAdminResponse } from "../model/order.model"

export class _order {
    static handelNew(): orderAdminResponse {
        return {
            address: "",
            date: "",
            id: "",
            phone: "",
            products: [],
            tatol: 0,
            fullName: '',
            note: '',
        }
    }

    static ConvertRequest(status: number): oderUser {
        const idUser: number | undefined = Number(sessionStorage.getItem('idUser'));
        if (!idUser) {
            return {
                idUser: 0,
                status: status
            }
        }
        return {
            idUser: idUser,
            status: status
        }
    }

    static ConvertCancel(id: string, note: string): cancelRequest {
        return {
            id: id,
            note: note
        }
    }

    static IstitleStatus(status: number): string {
        switch (status) {
            case 1:
                return "đơn hàng chờ xác nhận";
            case 2:
                return "đơn hàng đang giao";
            case 3:
                return "đơn hàng đã nhận";
            case 4:
                return "đơn hàng không xác nhận";
            case 5:
                return "đơn hàng không được giao";
            default:
                return " ";
        }
    }
}