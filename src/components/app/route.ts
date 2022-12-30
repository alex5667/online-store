import App from "./App";
import { ProductModel } from '../models/product';
import Products from '../../db/products';
import ProductDetails from '../../pages/details/ProductDetails'
import Page404 from "../../pages/Page404/Page404";
import ProductCart from '../ProductCart/ProductCart';
import { EventListener } from '../ProductItem/ProductItem';




export default class Route {
  products: ProductModel[];
  app: App;
  productCart: ProductCart;
  addToCartListener: EventListener;
  constructor() {
    this.products = Products;
    this.productCart=new ProductCart();
    this.addToCartListener= ['click', this.productCart.addToCart.bind(this.productCart)];
    this.app = new App(this.productCart,[this.addToCartListener]);
    this.start();
  }

  start(): void {
    const details = document.querySelectorAll('.link-button-details') as NodeListOf<HTMLAnchorElement>;
    details.forEach((detail) => detail.addEventListener('click', (e: Event) => this.route(e))
    )
    this.enableRouteChange();
  }


  route(event: Event): void {
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    console.log(event.target)

    const targetHref = `${target.href}/${target.id}`
    // const targetId=target.id;
    window.history.pushState({id: targetHref}, "", targetHref);
    localStorage.setItem('id', JSON.stringify(target.id));
    const path = window.location.pathname;
    localStorage.setItem('path', JSON.stringify(path));
    this.handleLocation(target.id);
    console.log(history.state)
    console.log(location.hash)

  }



  handleLocation = async (id?: string) => {
    const localPath = localStorage.getItem('path') as string;
    const localIdPath = JSON.parse(localPath);
    const path = window.location.pathname?window.location.pathname:localIdPath;
    const localId = localStorage.getItem('id') as string;
    const localIdProduct = JSON.parse(localId);
    const idProduct = id ? id : localIdProduct;
    const mainContainer = document.getElementById('main__container') as HTMLElement;
    mainContainer.innerHTML = '';
    if (path === '/' || path.includes('index')) {
      this.app = new App(this.productCart,[this.addToCartListener]);
    } else if (path.includes('/details')) {
      if (idProduct) {
        const product: ProductModel = this.products.filter((product) => product.id === +idProduct).shift() as ProductModel;
        new ProductDetails(product,[this.addToCartListener]);
      }
    } else {
      new Page404();
    }
    this.popState();

    // this.domContentLoaded();
  }

  popState(): void {
    window.addEventListener('popstate', (e:Event) =>{
      console.log(e)


      console.log(window.location.pathname)
      console.log(window.history.state)

      // this.route(e)
      this.handleLocation()
    });
  }



  domContentLoaded(): void {
    window.addEventListener('DOMContentLoaded', (e:Event) =>{
      console.log(e.target)

      console.log(window.history.state)

      console.log(window.location.pathname)
       this.handleLocation()});
  }


  private enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      console.log('The hash has changed!')

      console.log(hash)
      // App.renderNewPage(hash);
    });
  }


}

