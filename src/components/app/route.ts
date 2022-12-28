import App from "./App";
import  {ProductModel}  from '../models/product';
import Products from '../../db/products';
import ProductDetails from '../../pages/details/ProductDetails' 
import Page404 from "../../pages/404/404";



// export interface Routes {
//   '404': string;
//   '/': string;
//   '/pages/details/details.html': string;
// }
export default class Route {
  products: ProductModel[];
  app: App;
  constructor() {
    this.products = Products;
    this.start();
    this.app = new App();

  }

  start(): void {
    const details = document.querySelectorAll('.link-button-details') as NodeListOf<HTMLAnchorElement>;
    details.forEach((detail) => detail.addEventListener('click', (e: Event) => this.route(e))
    )

    

  }


  route(event: Event): void {
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const targetHref=`${target.href}/${target.id}`
    console.log(targetHref)
    window.history.pushState({}, "", targetHref);
    localStorage.setItem('id', JSON.stringify(target.id));
    this.handleLocation(target.id);
  }



  handleLocation = async (id?:string) => {
    const path = window.location.pathname;
    console.log(window.location.hash.slice(1))
    const mainContainer = document.getElementById('main__container') as HTMLElement;
    mainContainer.innerHTML = '';
    if (path === '/') {
      this.app = new App();
    } else if(path.includes('/details')) {
      if (id){
        const product: ProductModel = this.products.filter((product)=> product.id===+id).shift() as ProductModel;
        new ProductDetails(product);
      }else if(localStorage.getItem('id')!== null){
        const localId= localStorage.getItem('id') as string;
        const idProduct= JSON.parse(localId);
        const product: ProductModel = this.products.filter((product)=> product.id===+idProduct).shift() as ProductModel;
        new ProductDetails(product);
      }
    } else{
      new Page404();
    }
    this.popState();
    this.domContentLoaded();
  }

  popState(): void {
    window.addEventListener('popstate', () => this.handleLocation());
  }



  domContentLoaded(): void {
    window.addEventListener('DOMContentLoaded', () => this.handleLocation());
  }
  // domContentLoaded(): void {
  //   window.addEventListener('DOMContentLoaded', () => this.handleLocation());
  // }

  // private enableRouteChange() {
  //   window.addEventListener('hashchange', () => {
  //     const hash = window.location.hash;
  //     console.log(hash)
  //     // App.renderNewPage(hash);
  //   });
  // }


}

