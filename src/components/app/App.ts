import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters'
export default class App {
  productsList: ProductsList= new ProductsList();
  filters:Filters= new Filters(this.productsList);
  constructor() {
    this.filters
  }
  start() {

    this.filters.render();
  }

}
