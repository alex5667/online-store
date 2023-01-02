import App from "./App";
import { ProductModel } from '../models/product';
import Products from '../../db/products';
import ProductDetails from '../../pages/details/ProductDetails'
// import Page404 from "../../pages/Page404/Page404";
import ProductCart from '../ProductCart/ProductCart';
import { EventListener } from '../ProductItem/ProductItem';

export type Callback = <T>(data?: T) => void;

export interface Rout {
  path: RegExp,
  cb: (id?: string) => void,
}

export default class Route {
  products: ProductModel[];
  // app: App;
  productCart: ProductCart;
  addToCartListener: EventListener;
  routes: Rout[];
  mode: string;
  root: string;
  current: string;
  mainContainer: HTMLElement;
  constructor() {
    this.products = Products;
    this.productCart = new ProductCart();
    this.addToCartListener = ['click', this.productCart.addToCart.bind(this.productCart)];
    new App(this.productCart, [this.addToCartListener]);
    this.mainContainer = document.getElementById('main__container') as HTMLElement;
    this.routes = [
      {
        path: /about/,
        cb: () => {
          console.log('welcome in about page');
        },
      },
      {
        path: /product-details\/(.*)/,
        cb: (id) => {
          if (id) {
            this.mainContainer.innerHTML = '';
            const product: ProductModel = this.products.filter((product) => product.id === +id).shift() as ProductModel;
            new ProductDetails(product, [this.addToCartListener]);
          }

        },
      },
      {
        path: /^\s*$/,
        cb: () => {
          this.mainContainer.innerHTML = '';
          new App(this.productCart,[this.addToCartListener]);
        },
      },
    ];
    this.mode = 'hash';
    this.root = '/';
    this.current = '';
  }





  clearSlashes(path: string) {
    return path.toString()
      .replace(/\/$/, '')
      .replace(/^\//, '');
  }

  getFragment() {
    let fragment = '';
    if (this.mode === 'history') {
      fragment = this.clearSlashes(decodeURI(window.location.pathname + window.location.search));
      fragment = fragment.replace(/\?(.*)$/, '');
      fragment = this.root !== '/' ? fragment.replace(this.root, '') : fragment;
    } else {
      const match = window.location.href.match(/#(.*)$/);
      fragment = match ? match[1] : '';
    }
    return this.clearSlashes(fragment);
  }

  listen(): void {
    const inter: Callback = this.interval.bind(this) as Callback;
    let handle: ReturnType<typeof setInterval> | number = 0;
    clearInterval(handle);
    handle = setInterval(inter as Callback, 100);
    this.enableRouteChange();
  }


  
  interval(): void {
    if (this.current === this.getFragment()) return;
    this.current = this.getFragment();
    this.routes.some((route) => {
      const match = this.current.match(route.path);
      if (match) {

        match.shift();

        route.cb.call({}, ...match);
        return match;
      }
      return false;
    });
  }












  // start(): void {
  //   // const details = document.querySelectorAll('.link-button-details') as NodeListOf<HTMLAnchorElement>;
  //   // details.forEach((detail) => detail.addEventListener('click', (e: Event) => this.route(e))
  //   // );



  // }


  // route(event: Event): void {
  //   event = event || window.event;
  //   event.preventDefault();
  //   const target = event.target as HTMLAnchorElement;

  //   const targetHref = `${target.href}/${target.id}`
  //   window.history.pushState({id: targetHref}, "", targetHref);
  //   localStorage.setItem('id', JSON.stringify(target.id));
  //   const path = window.location.pathname;
  //   localStorage.setItem('path', JSON.stringify(path));
  //   this.handleLocation(target.id);
  // }



  // handleLocation = async (id?: string) => {
  //   console.log(window.history.state)
  //   console.log(window.location.search)
  //   const localPath = localStorage.getItem('path') as string;
  //   const localIdPath = JSON.parse(localPath);
  //   const path = window.location.pathname?window.location.pathname:localIdPath;
  //   const localId = localStorage.getItem('id') as string;
  //   const localIdProduct = JSON.parse(localId);
  //   const idProduct = id ? id : localIdProduct;
  //   const mainContainer = document.getElementById('main__container') as HTMLElement;
  //   mainContainer.innerHTML = '';
  //   if (path === '/' || path.includes('index')) {
  //     this.app = new App(this.productCart,[this.addToCartListener]);
  //   } else if (path.includes('/details')) {
  //     if (idProduct) {
  //       const product: ProductModel = this.products.filter((product) => product.id === +idProduct).shift() as ProductModel;
  //       new ProductDetails(product,[this.addToCartListener]);
  //     }
  //   } else {
  //     new Page404();
  //   }
  //   this.popState();

  //   // this.domContentLoaded();
  // }

  // popState(): void {
  //   window.addEventListener('popstate', (e:Event) =>{
  //     console.log(e)
  //     console.log(window.location.pathname)
  //     console.log(window.history.state)
  //     console.log(window.location.search)


  //     // this.route(e)
  //     this.handleLocation()
  //   });
  // }



  // domContentLoaded(): void {
  //   window.addEventListener('DOMContentLoaded', (e:Event) =>{
  //     console.log(e.target)

  //     console.log(window.history.state)

  //     console.log(window.location.pathname)
  //      this.handleLocation()});
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

