import { Product } from '../models/product';
import Products from '../../db/products';
import ProductItem from '../ProductItem/ProductItem'

import './ProductsList';


export default class ProductList {
  products: Product[];
  templateItem: HTMLTemplateElement;
  sectionElement: HTMLElement;
  element: HTMLElement;


  constructor() {
    this.products = Products;
    this.sectionElement = document.querySelector('.main__content') as HTMLElement;
    this.templateItem = document.getElementById('products-list') as HTMLTemplateElement;
    const clonedNode = document.importNode(this.templateItem.content, true);
    this.element = clonedNode.firstElementChild as HTMLElement;
    this.sectionElement.insertAdjacentElement('afterbegin', this.element);

  }
  render(): void {
    this.element.innerHTML = '';
    if (this.products.length > 0) {
      this.products.forEach((product) => new ProductItem('.products', product));
    }
  }
}
