interface item {
  title: string;
  type: number;
  active: boolean;
}
interface fiter {
  title: string;
  items: item[];
}

class shop {
  static create(): fiter[] {
    return [
      {
        title: 'Khoảng giá',
        items: [
          { title: 'Từ cao đến thấp', type: 1, active: false },
          { title: 'Từ thấp đến cao', type: 2, active: false },
        ],
      },
      {
        title: 'Sản phẩm',
        items: [
          { title: 'Bán chạy nhất', type: 3, active: false },
          { title: 'Mới nhất', type: 4, active: false },
          { title: 'Giảm giá', type: 5, active: false },
        ],
      },
      {
        title: 'Dành riêng cho bạn',
        items: [{ title: 'Đã xem gần đây', type: 6, active: false }],
      },
    ];
  }

  static PushNewFilter(list: fiter[]): fiter[] {
    let item: item = { title: 'Mua gần đây', type: 7, active: false };
    list[2].items.push(item);
    return list;
  }
  static SaveUserSee(id: string) {
    let list: string[] = [];
    let local = localStorage.getItem('see');
    if (local) {
      list = JSON.parse(local);
      let item = list.find((a) => a == id);
      if (!item) {
        list.push(id);
        localStorage.setItem('see', JSON.stringify(list));
      }
    } else {
      list.push(id);
      localStorage.setItem('see', JSON.stringify(list));
    }
  }
  static GetLocal(): string[] {
    let list: string[] = [];
    let local = localStorage.getItem('see');
    if (local) {
      const uniqueSet = new Set(JSON.parse(local));
      list = Array.from(uniqueSet) as string[];
      list.reverse();
    } else {
      list = [];
    }
    return list;
  }

  static RemoveItem(id: string): boolean {
    let isReturn = false;
    let local: string[] = JSON.parse(localStorage.getItem('see') as string);
    local.forEach((item) => {
      if (item == id) {
        local.splice(local.indexOf(item), 1);
        localStorage.setItem('see', JSON.stringify(local));
        isReturn = true;
        return;
      }
    });
    return isReturn;
  }
}
export { fiter, shop };
