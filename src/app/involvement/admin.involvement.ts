export class admin {
  static FilterTitle(router: string): string {
    let title: string = '';
    if (router == '/admin/product') {
      title = 'Quản lý sản phẩm';
    } else if (router == '/admin/checker') {
      title = 'Xác nhận đơn hàng';
    } else if (router == '/admin/delivery') {
      title = 'Đơn hàng đang giao';
    } else if (router == '/admin/history') {
      title = 'Lịch sử đơn hàng';
    }
    else if( router == '/admin/blog'){
      title = 'Quản lý bài viết';
    }
    return title;
  }
}
