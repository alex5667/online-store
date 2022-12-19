import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import { categories } from '../../db/productsProperties';
import ProductsList from '../ProductsList/ProductsList';
import {STATE_FILTER,Filter} from '../models/filter';

export default class Filters {
  categories: string[]= categories;
  state:Filter;
  productsList:ProductsList;
  constructor(productsList: ProductsList) {
    this.state =STATE_FILTER;
    this.productsList = productsList;
    this.render();

  }
  render(): void {
    this.chekboxFilters();

  }
  chekboxFilters(): void {
    this.categories.forEach((category) => new CheckboxItem(
      '.category-filter .filter__items',
      category,
      'category-filter',
      false,
    ).element.addEventListener('change', this.setCategoryFilter.bind(this)))
  }

  setCategoryFilter(e: Event):void{
    const checkboxLabel = e.currentTarget as HTMLLabelElement;
    const checkbox= e.target as HTMLInputElement;
    const checkboxSpan =checkboxLabel?.querySelector('.filter-checkbox__text-label')as HTMLSpanElement;
    const category= checkboxSpan.innerText.trim().toLowerCase();
    if (checkbox.checked) {
      this.state.category.push(category);
    } else {
      this.state.category = this.state.category.filter((el) => el !== category);
    }
    this.productsList.categoryFilter(this.state);

  }

}