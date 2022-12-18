import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import { categories } from '../../db/productsProperties';
import ProductsList from '../ProductsList/ProductsList';
export default class Filters {
  categories: string[];
  constructor() {
    this.categories = categories;

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