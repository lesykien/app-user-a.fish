interface category {
  id: number;
  name: string;
}
interface categoryShop {
  id: number;
  name: string;
  router: string;
}
class _categorys {
  static EditRouter(response: category[]): categoryShop[] {
    let list: categoryShop[] = [];
    response.forEach((item) => {
      let category: categoryShop = {
        id: item.id,
        name: item.name,
        router: item.name.toLowerCase().replace(/ /g, '-') + `-${item.id}`,
      };
      list.push(category);
    });
    return list;
  }
}
export { category, categoryShop, _categorys };
