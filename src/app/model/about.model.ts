import { productAdminResponse } from './products.model';

interface itemAbout {
  id: string;
  name: string;
}
class _about {
  static SetItemLocal(item: productAdminResponse) {
    let newItem = this.Convert(item);
    localStorage.setItem('about', JSON.stringify(newItem));
  }

  static Convert(item: productAdminResponse): itemAbout {
    return {
      id: item.id,
      name: item.name,
    };
  }
}
export { itemAbout, _about };
