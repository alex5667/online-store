import { ProductModel } from '../models/product';
import Products from '../../db/products';
import ProductItem, { EventListener } from '../ProductItem/ProductItem'
import { SortFilter, STATE_FILTER, Filter } from '../../utils/filter';
import './ProductsList.scss';
import ProductCart from '../ProductCart/ProductCart';


export default class ProductsList {
  products: ProductModel[];
  templateItem: HTMLTemplateElement;
  sectionElement: HTMLElement;
  element: HTMLElement;
  productCart: ProductCart;
  listeners: EventListener[];

  constructor(cart: ProductCart,listeners: EventListener[] = [],
    ) {
    this.products = Products;
    this.productCart = cart;
    this.listeners = listeners;

    this.sectionElement = document.getElementById('main__content') as HTMLElement;
    this.templateItem = document.getElementById('products-list') as HTMLTemplateElement;
    const clonedNode = document.importNode(this.templateItem.content, true);
    this.element = clonedNode.firstElementChild as HTMLElement;
    this.sectionElement.insertAdjacentElement('beforeend', this.element);
    const filterState: string | null = localStorage.getItem('Filter');
    this.useFilter(filterState ? JSON.parse(filterState) : STATE_FILTER);

  }

  render(): void {

    this.element.innerHTML = '';
    if (this.products.length > 0) {
      this.products.forEach((product) => new ProductItem('.products', product, this.productCart.state.includes(String(product.id)),this.listeners
      ));
    }

  }

  useFilter(filterState: Filter) {
    this.checkboxFilter(filterState);
    this.rangeFilter(filterState);
    this.sortFilter(filterState);
    this.searchFilter(filterState);
    this.render();

  }

  searchFilter(filterState: Filter) {
    const searchValue: string = filterState.search.toLowerCase();

    if (searchValue !== '') {
      const searchResult: ProductModel[] = this.products.filter((product) => {
        const title: string = product.title.toLowerCase();
        const brand: string = product.brand.toLowerCase();
        const description: string = product.description.toLowerCase();
        const category: string = product.category.toLowerCase();
        const isExist = (prop: string): boolean => prop.indexOf(searchValue) > -1;
        return isExist(category)
          || isExist(brand)
          || isExist(description)
          || isExist(title)
      });

      this.products = searchResult;
    }

  }

  sortFilter(filterState: Filter) {
    const { sort }: { sort: SortFilter } = filterState;
    const sortedByPrice = (): ProductModel[] => this.products.sort((a, b) => +b.price - +a.price);
    const sortedByRating = (): ProductModel[] => this.products.sort((a, b) => +b.rating - +a.rating);
    const sortedByDiscount = (): ProductModel[] => this.products.sort((a, b) => +b.discountPercentage - +a.discountPercentage);
    switch (sort) {
      case SortFilter.PRICE:
        this.products = sortedByPrice();
        break;
      case SortFilter.PRICE_REVERSE:
        this.products = sortedByPrice().reverse();
        break;
      case SortFilter.RATING:
        this.products = sortedByRating();
        break;
      case SortFilter.RATING_REVERSE:
        this.products = sortedByRating().reverse();
        break;
      case SortFilter.DISCOUNT:
        this.products = sortedByDiscount();
        break;
      case SortFilter.DISCOUNT_REVERSE:
        this.products = sortedByDiscount().reverse();
        break;
      default:
        this.products = this.products.sort((a, b) => +a.id - +b.id);
    }
  }

  checkboxFilter(filterState: Filter): void {
    localStorage.setItem('Filter', JSON.stringify(filterState));
    const { category, brand }: Filter = filterState;
    if (category.length > 0 || brand.length > 0) {
      this.products = Products.filter((product) => {
        if (category.length > 0 && !category.includes(product.category)) return false;
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        return true;
      })
    } else {
      this.products = Products;

    }
  }

  rangeFilter(filterState: Filter): void {
    const { price }: {
      price: [number, number] | []
    } = filterState;
    if (price.length === 2) {
      this.products = this.products.filter((product) => (
        product.price >= price[0] && product.price <= price[1]
      ));
    }
  }


}
