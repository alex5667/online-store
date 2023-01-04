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
  listRender: string[];
  constructor(listeners: EventListener[]) {
    new ProductInCartsView();
    this.products = products;
    this.listeners = listeners;
    const productsInLocal: string | null = localStorage.getItem('productCart');
    this.productsInCart = productsInLocal ? JSON.parse(productsInLocal) : [];
    this.listRender=[];
    this.setLimit();

  }

  render(list:string[]): void {
    const divContent = document.getElementById('product-in-cart__content') as HTMLDivElement;
    divContent.innerHTML = '';
     const productsList = this.products.filter((product) => list.includes(String(product.id)));
     productsList.forEach((product, idx) => {
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
          amount.classList.add(`amount-in-cart-${product.id}`);
          buttons.appendChild(amount);
          this.setAmountInButtons(product.id);
          this.addButtons(`.buttons-in-cart-${idx + 1}`, product.id, 'del');
      });
    this.addCardClass();
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
    button.setAttribute('button-id',String(id)) ;
    selector.appendChild(button);
    button.addEventListener('click', (e: Event) => this.useButtons(e));
  }

  useButtons(event: Event): void {
    const target = event.target as HTMLButtonElement;
    const targetId= target.getAttribute('button-id') as string;
    if (target.classList.contains('add-button')) {
      this.productsInCart.push(String(targetId))
    } else {
      const indexProduct = this.productsInCart.indexOf(String(targetId));
      if (indexProduct != -1) {
        this.productsInCart.splice(indexProduct, 1);
      }
    }
    localStorage.setItem('productCart', JSON.stringify(this.productsInCart));
    this.summaryProducts();
    this.updateCounter();
    this.summaryTotal();
    this.setAmountInButtons(+targetId);
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

  setAmountInButtons(id:number):void{
    const buttonId= document.querySelector(`.amount-in-cart-${id}`) as HTMLDivElement;
    const amount =this.productsInCart.filter((product)=> product===String(id)).length.toString();
    buttonId.innerText=`${amount}`;
  }

  setLimit(): void {
    const limit = document.getElementById('limit') as HTMLInputElement;
    this.listRender = [...new Set(this.productsInCart)];
    const setLimit= this.listRender.length;
    limit.value = `${setLimit}`;
    limit.addEventListener('change',(e:Event)=>{
      console.log(this)
      this.changeRender(e)
    });
    this.render(this.listRender);
    this.setPage();
  }

  changeRender(event:Event):void{
    console.log(this)
      const target =event.target as HTMLInputElement;
      const maxList =+target.value;
      const sliceList= this.listRender.slice(0,maxList);
      this.render(sliceList);
  }

  setPage():void{
    const pageNumber= document.querySelector('.page-number')as HTMLDivElement;
    pageNumber.innerText=`Page: 1`;
    // const leftArrow= document.getElementById('left') as HTMLButtonElement;
    // const rightArrow= document.getElementById('right') as HTMLButtonElement;
    // // leftArrow.addEventListener('click', this.leftButton);
    // rightArrow.addEventListener('click', this.changeRender.bind(this));

  }

  // leftButton():void{


  // // }
  // rightButton():void{


  // }

  






  summaryProducts() {
    const summaryProducts = document.querySelector('.summary__products') as HTMLDivElement;
    summaryProducts.innerText = `Products: ${this.productsInCart.length}`;
  }

  summaryTotal(): void{
    let sumTotal=0;
    for(const id of this.productsInCart){
      sumTotal+=this.products.filter((product)=> product.id===+id)[0].price;
    }
    const summaryTotal = document.querySelector('.summary__total') as HTMLDivElement;
    summaryTotal.innerText = `Total: ${sumTotal}`;
  }








}

export default ProductInCarts;