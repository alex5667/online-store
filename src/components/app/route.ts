import App from "./App";
import { ProductModel } from '../models/product';
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
    this.enableRouteChange();
    // this.domContentLoaded();
  }


  route(event: Event): void {
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    const targetHref = `${target.href}/${target.id}`
    window.history.pushState({}, "", targetHref);
    localStorage.setItem('id', JSON.stringify(target.id));
    const path = window.location.pathname;
    localStorage.setItem('path', JSON.stringify(path));
    this.handleLocation(target.id);
    this.popState();
    this.domContentLoaded();
  }



  handleLocation = async (id?: string) => {
    const localPath = localStorage.getItem('path') as string;
    const localIdPath = JSON.parse(localPath);
    console.log(localIdPath)
    const path = window.location.pathname?window.location.pathname:localIdPath;
    console.log(path)
    const localId = localStorage.getItem('id') as string;
    const localIdProduct = JSON.parse(localId);
    const idProduct = id ? id : localIdProduct;
    const mainContainer = document.getElementById('main__container') as HTMLElement;
    mainContainer.innerHTML = '';
    if (path === '/' || path.includes('index')) {
      this.app = new App();
    } else if (path.includes('/details')) {
      if (idProduct) {
        const product: ProductModel = this.products.filter((product) => product.id === +idProduct).shift() as ProductModel;
        new ProductDetails(product);
      }
    } else {
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

  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      console.log('The hash has changed!')

      console.log(hash)
      // App.renderNewPage(hash);
    });
  }


}

