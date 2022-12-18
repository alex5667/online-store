import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters'
export default class App {
  productsList: ProductsList;
  filters:Filters;
  constructor() {
    this.productsList = new ProductsList();
    this.filters= new Filters();
  }
  start() {

    this.productsList.render();
    this.filters.render();
  }

}
