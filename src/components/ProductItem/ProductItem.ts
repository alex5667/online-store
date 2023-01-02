import  {ProductModel}  from '../models/product';
import './ProductItem.scss'


export type EventListener = [string, (e: Event) => void];



export default class ProductItem{
  product: ProductModel;
  templateItem: HTMLTemplateElement;
  sectionElement:HTMLElement;
  element:HTMLElement;
  isInCart: boolean;
  listeners: EventListener[]


  constructor(
    ElementSelector: string,
    product: ProductModel,
    isInCart: boolean,
    listeners: EventListener[],

  ){
    this.product = product;
    this.listeners = listeners;

    this.sectionElement = document.querySelector(ElementSelector) as HTMLElement;
    this.templateItem = document.getElementById('product-item') as HTMLTemplateElement;
    const clonedNode = document.importNode(this.templateItem.content, true);
    this.element = clonedNode.firstElementChild as HTMLElement;
    this.element.id=String(product.id);
    this.sectionElement.insertAdjacentElement('afterbegin', this.element);
    this.isInCart = isInCart;



    this.render();
  }
  
  


  render(): void{
    const image = this.element.querySelector('.product__img img') as HTMLImageElement;
    const titleEl = this.element.querySelector('.product__title') as HTMLHeadingElement;
    const categoryEL = this.element.querySelector('.product__category') as HTMLParagraphElement;
    const brandEl = this.element.querySelector('.product__brand') as HTMLParagraphElement;
    const stockEL = this.element.querySelector('.product__stock') as HTMLParagraphElement;
    const ratingEl = this.element.querySelector('.product__rating') as HTMLParagraphElement;
    const discountEL = this.element.querySelector('.product__discount') as HTMLParagraphElement;
    const priceEl = this.element.querySelector('.product__price') as HTMLParagraphElement;
    const addToCartBtn = this.element.querySelector('.link-button-add-to-cart') as HTMLButtonElement;
    const details = this.element.querySelector('.link-button-details') as HTMLAnchorElement;

    const {thumbnail,title,category,brand,stock,rating,discountPercentage,price,id}:ProductModel=this.product;
    image.src = thumbnail;
    titleEl.innerText =`${title}`;
    categoryEL.innerText =`Category: ${category}`;
    brandEl.innerText =`Brand: ${brand}`;
    stockEL.innerText =`Stock: ${stock}`;
    ratingEl.innerText =`Rating: ${rating}`;
    discountEL.innerText =`Discount: ${discountPercentage}`;
    priceEl.innerText =`Price: ${price}`;
    if(details) {
      details.id=String(id);
      details.href=`/#/product-details/${String(id)}`
    }

    if (this.isInCart) {
      this.element.classList.add('product--in-cart');
      addToCartBtn.innerText = 'Remove';
    }
    this.useListeners(addToCartBtn);

  }

  useListeners(Btn:HTMLButtonElement){
    this.listeners.forEach((listener) => Btn.addEventListener(listener[0], listener[1]));
  }




}
