import MainFilters from '../view/MainFilters';
import MainContent from '../view/MainContent';
import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters';
// import Route from './route';


export default class App {
  mainFilters:MainFilters;
  mainContent:MainContent;
  productsList: ProductsList;
  filters:Filters;
  // route:Route
  constructor() {
    this.mainFilters= new MainFilters();
    this.mainContent=new MainContent();

    this.productsList= new ProductsList();
    this.filters= new Filters(this.productsList);
    // this.route= new Route();

  }
  start() {

    this.filters.render();
  }

}
