import MainFilters from '../view/MainFilters';
import MainContent from '../view/MainContent';
import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters';


export default class App {
  mainFilters:MainFilters;
  mainContent:MainContent;

  productsList: ProductsList;
  filters:Filters;

  constructor() {
    this.mainFilters= new MainFilters();
    this.mainContent=new MainContent();
    this.productsList= new ProductsList();
    this.filters= new Filters(this.productsList)
  }
  start() {

    this.filters.render();
  }

}
