import { productAdminResponse } from "./products.model";

interface itemAbout {
  id: string;
  name: string;
}
class _about{
    static SetItemLocal(item : productAdminResponse){
        let loacal = localStorage.getItem('about');
        if(!loacal){
            
        }
    }
}
export { itemAbout , _about }