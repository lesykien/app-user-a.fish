import { cartLocal, oderITem, order, valueFormCart } from '../model/cart.model';
import { ImagesResponse } from '../model/image.model';
import { product, productAdminResponse } from '../model/products.model';

export class _cart {
  static convert(item: product): cartLocal {
    return {
      id: item.id,
      name: item.name,
      quantity: 1,
      price: item.price,
      voucher: item.voucher,
      image: item.image,
      idUser: 0,
    };
  }

  static PostItem(item: productAdminResponse): product {
    let image: ImagesResponse = item.images.find(
      (a) => a.avatar == true
    ) as ImagesResponse;
    return {
      id: item.id,
      name: item.name,
      price: item.price,
      image: image.image,
      status: item.status,
      voucher: item.vourcher,
    };
  }

  static updateQuantity(item: product, quantityNew: number): cartLocal {
    return {
      id: item.id,
      name: item.name,
      quantity: 1 + quantityNew,
      price: item.price,
      voucher: item.voucher,
      image: item.image,
      idUser: 0,
    };
  }

  static updateIdUser(
    item: cartLocal,
    idUser: number,
    quantity: number
  ): cartLocal {
    return {
      id: item.id,
      name: item.name,
      quantity: quantity,
      price: item.price,
      voucher: item.voucher,
      image: item.image,
      idUser: idUser,
    };
  }

  static ConvetOrderItem(listItem: cartLocal[]): oderITem[] {
    let listReturn: oderITem[] = [];
    listItem.forEach((item: cartLocal) => {
      let newItem: oderITem = {
        idProduct: item.id,
        quantity: item.quantity,
      };
      listReturn.push(newItem);
    });
    return listReturn;
  }

  static HadleOder(
    id: number,
    listItem: oderITem[],
    form: valueFormCart
  ): order {
    return {
      idUser: id,
      address: form.address,
      note: form.note,
      items: listItem,
    };
  }

  static SetCartLocal(item: product, key: string) {
    let list: cartLocal[] = [];
    const cartItem: cartLocal = _cart.convert(item);
    const local = localStorage.getItem(key);
    if (!local) {
      list.push(cartItem);
      localStorage.setItem(key, JSON.stringify(list));
    } else {
      list = JSON.parse(local);
      let checkItem: cartLocal | undefined = list.find((a) => a.id == item.id);
      if (checkItem) {
        list.forEach((product) => {
          if (product.id == checkItem.id) {
            const index = list.indexOf(product);
            list.splice(index, 1);
            const udpate: cartLocal = _cart.updateQuantity(
              item,
              checkItem.quantity
            );
            list.push(udpate);
          }
        });
        localStorage.setItem(key, JSON.stringify(list));
        alert('Thêm sản phẩm thành công');
        return;
      }
      list.push(cartItem);
      localStorage.setItem(key, JSON.stringify(list));
    }
    alert('Thêm sản phẩm thành công');
  }

  static AddIdUser(id: number) {
    const local = localStorage.getItem('cart');
    if (!local) {
      return;
    }
    let listItem: cartLocal[] = JSON.parse(local);

    const localById = localStorage.getItem(`cart${id}`);
    if (!localById) {
      localStorage.setItem(`cart${id}`, JSON.stringify(listItem));
    } else {
      let listItemById: cartLocal[] = JSON.parse(localById);
      if (listItemById.length == 0) {
        localStorage.setItem(`cart${id}`, JSON.stringify(listItem));
      }
    }

    localStorage.removeItem('cart');
  }
}
