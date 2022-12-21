import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import { categories, brands } from '../../db/productsProperties';
import ProductsList from '../ProductsList/ProductsList';
import { STATE_FILTER, Filter } from '../models/filter';
import Products from '../../db/products'

export default class Filters {
  categories: string[] = categories;
  brands: string[] = brands;
  state: Filter;
  productsList: ProductsList;
  constructor(productsList: ProductsList) {
    const filter: string | null = localStorage.getItem('Filter');
    this.state = filter ? JSON.parse(filter) : STATE_FILTER;
    this.productsList = productsList;
    this.render();
  }
  render(): void {
    this.checkboxFilters(this.categories);

  }
  checkboxFilters(categories: string[]): void {
    categories.forEach((category) => {
      const amount = Products.filter((product) => product.category === category).length;
      new CheckboxItem(
        '.category-filter .filter__items',
        category,
        'category-filter',
        amount,
        amount
      ).element.addEventListener('change', this.setCategoryFilter.bind(this))
    }
    )

    this.brands.forEach((brand) => {
      const amount = Products.filter((product) => product.brand === brand).length;
      new CheckboxItem(
        '.brand-filter .filter__items',
        brand,
        'brand-filter',
        amount,
        amount
      ).element.addEventListener('change', this.setBrandFilter.bind(this))
    });
  }



  setCategoryFilter(e: Event): void {
    const checkboxLabel = e.currentTarget as HTMLLabelElement;
    const checkbox = e.target as HTMLInputElement;
    const checkboxSpan = checkboxLabel?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const category = checkboxSpan.innerText.trim();
    if (checkbox.checked) {
      this.state.category.push(category);
    } else {
      this.state.category = this.state.category.filter((el) => el !== category);
    }
    this.productsList.useFilter(this.state);
  }

  setBrandFilter(e: Event): void {
    const checkboxLabel = e.currentTarget as HTMLLabelElement;
    const checkbox = e.target as HTMLInputElement;
    const checkboxSpan = checkboxLabel?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const brand = checkboxSpan.innerText.trim();

    if (checkbox.checked) {
      this.state.brand.push(brand);
    } else {
      this.state.brand = this.state.brand.filter((el) => el !== brand);
    }
    this.productsList.useFilter(this.state);
  }


}
