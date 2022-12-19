import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import { categories } from '../../db/productsProperties';
import ProductsList from '../ProductsList/ProductsList';
import {STATE_FILTER,Filter} from '../models/filter'
export default class Filters {
  categories: string[]= categories;
  state:Filter;
  constructor() {
    this.state =STATE_FILTER;
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
    ))
  }

}