import { ProductModel } from '../models/product';
import Products from '../../db/products';
import ProductItem from '../ProductItem/ProductItem'
import { STATE_FILTER, Filter } from '../models/filter';
import Filters from '../Filters/Filters';


import './ProductsList';


export default class ProductsList {
  products: ProductModel[];
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
    const filterState: string | null = localStorage.getItem('Filter');
    this.useFilter(filterState ? JSON.parse(filterState) : STATE_FILTER);



  }

  render(): void {

    this.element.innerHTML = '';
    if (this.products.length > 0) {
      this.products.forEach((product) => new ProductItem('.products', product));
    }

  }

  useFilter(filterState: Filter) {
    this.checkboxFilter(filterState);
    this.render();

  }

  checkboxFilter(filterState: Filter): void {

    localStorage.setItem('Filter', JSON.stringify(filterState));
    const { category, brand }: Filter = filterState;
    if (category.length > 0||brand.length > 0) {

      this.products = Products.filter((product) => {
        if (category.length > 0 && !category.includes(product.category)) return false;
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        return true;
      }

      )
      
    } else {
      this.products = Products;
    }
  }





}
