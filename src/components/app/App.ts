import ProductsList from '../ProductsList/ProductsList';

export default class App {
  productsList: ProductsList = new ProductsList();
  constructor(){
    this.productsList= new ProductsList();
  }
  start() {

    this.productsList.render();
  }
  
}
