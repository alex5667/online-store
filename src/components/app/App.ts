import ProductsList from '../ProductsList/ProductsList';
import CategoryList from '../CategoriesList/CategoriesList'
export default class App {
  productsList: ProductsList;
  categoryList: CategoryList;
  constructor() {
    this.productsList = new ProductsList();
    this.categoryList = new CategoryList();
  }
  start() {

    this.productsList.render();
    this.categoryList.render();
  }

}
