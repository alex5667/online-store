import ProductInCartsView from './ProductInCartsView';
// import ProductsList from "../../components/ProductsList/ProductsList";
// import ProductCart from "../../components/ProductCart/ProductCart";
import { EventListener } from "../../components/ProductItem/ProductItem";
import  {ProductModel} from '../../components/models/product';
import ProductItem from '../../components/ProductItem/ProductItem';
import products from '../../db/products';

import './ProductInCarts.scss'
class ProductInCarts  {
  productsInCart:string[];
  products:ProductModel[];
  listeners:EventListener[];
  constructor(listeners: EventListener[]){
    new ProductInCartsView();
    this.products= products;
    this.listeners=listeners;
    // new ProductsList(productCart,addToCartListener,'product-in-cart__content');
    const productsInLocal: string | null = localStorage.getItem('productCart');
    this.productsInCart = productsInLocal ? JSON.parse(productsInLocal) : [];
    this.render();

  }

  render(): void {
    // const divContent= document.getElementById('product-in-cart__content') as HTMLDivElement;
    // divContent.innerHTML = '';


    this.products=this.products.filter((product)=>  this.productsInCart.includes(String( product.id)));
    console.log(this.products)
    if (this.products.length > 0) {
      this.products.forEach((product) => new ProductItem('.product-in-cart__content', product, true,this.listeners
      ));
    }



  }

  


  



}

export default ProductInCarts;