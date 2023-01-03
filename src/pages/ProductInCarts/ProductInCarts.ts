import ProductInCartsView from './ProductInCartsView';
// import ProductsList from "../../components/ProductsList/ProductsList";
// import ProductCart from "../../components/ProductCart/ProductCart";
import { EventListener } from "../../components/ProductItem/ProductItem";
import { ProductModel } from '../../components/models/product';
import ProductItem from '../../components/ProductItem/ProductItem';
import products from '../../db/products';

import './ProductInCarts.scss'
class ProductInCarts {
  productsInCart: string[];
  products: ProductModel[];
  listeners: EventListener[];
  constructor(listeners: EventListener[]) {
    new ProductInCartsView();
    this.products = products;
    this.listeners = listeners;
    const productsInLocal: string | null = localStorage.getItem('productCart');
    this.productsInCart = productsInLocal ? JSON.parse(productsInLocal) : [];
    this.render();

  }

  render(): void {
    const divContent = document.getElementById('product-in-cart__content') as HTMLDivElement;
    divContent.innerHTML = '';
    this.products = this.products.filter((product) => this.productsInCart.includes(String(product.id)));
    if (this.products.length > 0) {
      this.products.forEach((product, idx) => {
        const productCard = document.createElement('div');
        productCard.classList.add(`product-card-${idx + 1}`);
        divContent.appendChild(productCard);
        const productNum = document.createElement('div');
        productNum.classList.add(`product-num-${idx + 1}`);
        productNum.innerText = `${idx + 1}`;
        productCard.appendChild(productNum);
        const productContent = document.createElement('div');
        productContent.classList.add(`product-content-${idx + 1}`);
        productCard.appendChild(productContent);
        new ProductItem(`.product-content-${idx + 1}`, product, true, this.listeners);
        const buttons = document.createElement('div');
        buttons.classList.add(`buttons-in-cart-${idx + 1}`);
        productContent.appendChild(buttons);

        this.addButtons(`.buttons-in-cart-${idx + 1}`, product.id, 'add');
        const amount = document.createElement('div');
        amount.classList.add(`amount-in-cart-${idx + 1}`);
        amount.innerText=`0`;
        buttons.appendChild(amount);

        this.addButtons(`.buttons-in-cart-${idx + 1}`, product.id, 'del');
      });
    }
    this.addCardClass();
    this.setLimit();
    this.summaryProducts();
    this.summaryTotal();
  }


  addCardClass(): void {
    const allCards = document.querySelectorAll('.product') as NodeListOf<Element>;
    allCards.forEach((card) => {
      const allProductEl = card?.querySelectorAll('*') as NodeListOf<Element>;
      allProductEl.forEach((el) => el.classList.add('cart'));
    })
  }
  addButtons(elementSelector: string, id: number, action: string): void {
    const selector = document.querySelector(elementSelector) as HTMLDivElement;
    const button = document.createElement('button');
    button.classList.add(`${action}-button`);
    button.innerText = `${action}`;
    button.id = String(id);
    selector.appendChild(button);
    button.addEventListener('click', (e: Event) => this.useButtons(e))
  }

  useButtons(event: Event): void {
    const target = event.target as HTMLButtonElement;
    if (target.classList.contains('add-button')) {
      this.productsInCart.push(String(target.id))
    } else {
      const indexProduct = this.productsInCart.indexOf(String(target.id));
      if (indexProduct != -1) {
        this.productsInCart.splice(indexProduct, 1);
      }
    }
    localStorage.setItem('productCart', JSON.stringify(this.productsInCart));
    this.summaryProducts();
    this.updateCounter();
    this.summaryTotal();
  }

  private updateCounter(): void {
    const cartAmount= document.querySelector('.cart-counter') as HTMLDivElement;
    cartAmount.innerHTML='';
    if (this.productsInCart.length > 0) {
      cartAmount.innerHTML = `${this.productsInCart.length}`;
    } else {
      cartAmount.innerHTML = `${this.productsInCart.length}`;
    }
  }

  setLimit(): void {
    const limit = document.getElementById('limit') as HTMLInputElement;
    limit.value = `${this.productsInCart.length}`;
  }

  summaryProducts() {
    const summaryProducts = document.querySelector('.summary__products') as HTMLDivElement;
    summaryProducts.innerText = `Products: ${this.productsInCart.length}`;
  }

  summaryTotal(): void{
    let sumTotal=0;
    for(const id of this.productsInCart){
      sumTotal+=this.products.filter((product)=> product.id===+id)[0].price
    }
    const summaryTotal = document.querySelector('.summary__total') as HTMLDivElement;
    summaryTotal.innerText = `Total: ${sumTotal}`;
  }








}

export default ProductInCarts;