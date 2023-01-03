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
    const productsInLocal: string | null = localStorage.getItem('productCart');
    this.productsInCart = productsInLocal ? JSON.parse(productsInLocal) : [];
    this.render();

  }

  render(): void {
    const divContent= document.getElementById('product-in-cart__content') as HTMLDivElement;
    divContent.innerHTML = '';
    this.products=this.products.filter((product)=> this.productsInCart.includes(String( product.id)));
    if (this.products.length > 0) {
      this.products.forEach((product,idx) =>{
        const productCard =document.createElement('div');
        productCard.classList.add(`product-card-${idx+1}`);
        divContent.appendChild(productCard);
        const productNum =document.createElement('div');
        productNum.classList.add(`product-num-${idx+1}`);
        productNum.innerText=`${idx+1}`;
        productCard.appendChild(productNum);
        const productContent =document.createElement('div');
        productContent.classList.add(`product-content-${idx+1}`);
        productCard.appendChild(productContent);
        new ProductItem(`.product-content-${idx+1}`, product, true,this.listeners)
      }
        );
    }
    this.addCardClass();
    this.setLimit();
  }


  addCardClass(): void{
    const allCards = document.querySelectorAll('.product') as NodeListOf<Element>;
    allCards.forEach((card)=> {
      const allProductEl=card?.querySelectorAll('*') as NodeListOf<Element>;
      allProductEl.forEach((el)=> el.classList.add('cart'));
    })
  }

  setLimit(){
    const limit = document.getElementById('limit') as HTMLInputElement;
    limit.value=`${this.products.length}`;
  }

  


  



}

export default ProductInCarts;