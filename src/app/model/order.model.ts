interface orderAdminDTOs {
  id: string;
  tatol: number;
  data: string;
  phone: string;
  delivery: number;
  pay: boolean;
}
interface productByOrder {
  id: string;
  image: string;
  name: string;
  price: number;
  quantity: number;
  status: boolean;
  voucher: number;
}
interface orderAdminResponse {
  address: string;
  date: string;
  id: string;
  phone: string;
  products: productByOrder[];
  tatol: number;
  fullName: string;
  note: string;
  pay: boolean;
}

interface oderUser {
  idUser: number;
  status: number;
}

interface cancelRequest {
  id: string;
  note: string;
}

interface payRequest {
  id: string;
  amount: number;
}

export {
  orderAdminDTOs,
  orderAdminResponse,
  oderUser,
  cancelRequest,
  payRequest,
};
