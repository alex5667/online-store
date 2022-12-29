import MainFilters from '../view/MainFilters';
import MainContent from '../view/MainContent';
import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters';
import ProductCart from '../ProductCart/ProductCart';
// import Route from './route';


export default class App {
  productCart:ProductCart;
  mainFilters: MainFilters;
  mainContent: MainContent;
  productsList: ProductsList;
  filters: Filters;
  // route:Route
  constructor() {
    this.mainFilters = new MainFilters();
    this.mainContent = new MainContent();
    this.productCart=new ProductCart();

    this.productsList = new ProductsList(this.productCart);


    this.filters = new Filters(this.productsList);
    // this.route= new Route();
    this.render()
  }
  render() {
    this.filters.render();
  }

}
