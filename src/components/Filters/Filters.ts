/* eslint-disable @typescript-eslint/no-unused-vars */
import * as noUiSlider from 'nouislider';
import _ from 'lodash';
import { ProductModel } from '../models/product';
import { STATE_FILTER, Filter } from '../../utils/filter';
import { categories, brands, prices, quantities } from '../../db/productsProperties';

import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import ProductsList from '../ProductsList/ProductsList';
import Products from '../../db/products';



export default class Filters {
  categories: string[] = categories;
  brands: string[] = brands;
  prices: number[] = prices;
  quantities: number[] = quantities;
  state: Filter;
  productsList: ProductsList;
  productsForFilter: ProductModel[];
  constructor(productsList: ProductsList) {
    const filter: string | null = localStorage.getItem('Filter');
    this.state = filter ? JSON.parse(filter) : STATE_FILTER;
    this.productsList = productsList;
    this.productsForFilter = Products;
  }
  render(): void {
    this.checkboxFilters();
    this.rangeFilters();
  }

  checkboxFilters(): void {
    categories.forEach((category) => {
      const amount = Products.filter((product) => product.category === category).length;
      new CheckboxItem(
        '.category-filter .filter__items',
        category,
        'category-filter',
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
      this.state.price = [];
    } else {
      this.state.category = this.state.category.filter((el) => el !== category);
      this.state.price = [];
    }
    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
    this.rangeFilters();

  }

  setBrandFilter(e: Event): void {
    const checkboxLabel = e.currentTarget as HTMLLabelElement;
    const checkbox = e.target as HTMLInputElement;
    const checkboxSpan = checkboxLabel?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const brand = checkboxSpan.innerText.trim();
    if (checkbox.checked) {
      this.state.brand.push(brand);
      this.state.price = [];
    } else {
      this.state.brand = this.state.brand.filter((el) => el !== brand);
      this.state.price = [];

    }
    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
    this.rangeFilters();
  }

  setAmountInCheckbox(): void {
    const amountCheckboxes = document.querySelectorAll('.filter-checkbox__text-amount-in-checkbox') as NodeListOf<HTMLSpanElement>;
    amountCheckboxes.forEach((box) => {
      const labelBox = box.closest('label') as HTMLLabelElement;
      labelBox.classList.remove('lock-input');
      if (categories.includes(box.id)) {
        const amount = this.productsForFilter.filter((product) => product.category === box.id).length;
        box.innerText = `${amount}`;
        if (amount === 0) {
          const labelBox = box.closest('label') as HTMLLabelElement;
          labelBox.classList.add('lock-input');
        }
      }
      if (brands.includes(box.id)) {
        const amount = this.productsForFilter.filter((product) => product.brand === box.id).length;
        box.innerText = `${amount}`;
        if (amount === 0) {
          const labelBox = box.closest('label') as HTMLLabelElement;
          labelBox.classList.add('lock-input');
        }
      }
    })
  }

  getProductsForFilter(state: Filter) {
    const { category, brand, price }: Filter = state;
    if (category.length > 0 || brand.length > 0 || price.length === 2) {
      this.productsForFilter = Products.filter((product) => {
        if (category.length > 0 && !category.includes(product.category)) return false;
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        if (price.length === 2) {
          if (price[0] > product.price) return false;
          if (price[1] < product.price) return false;
        }
        return true;
      })
    } else {
      this.productsForFilter = Products;
    }
    this.setStatePrice();
  }



  rangeFilters(): void {
    const priceMin: number = this.prices[0];
    const priceMax: number = this.prices[this.prices.length - 1];
    const priceDefaultMin = this.state.price[0] ? this.state.price[0] : priceMin;
    const priceDefaultMax = this.state.price[1] ? this.state.price[1] : priceMax;
    const priceDefault: [number, number] = [priceDefaultMin, priceDefaultMax];
    const priceInputs: [HTMLSpanElement, HTMLSpanElement] = [
      document.getElementById('price-filter__value-min') as HTMLSpanElement,
      document.getElementById('price-filter__value-max') as HTMLSpanElement,
    ];

    const priceSlider = document.getElementById('price-filter__slider') as noUiSlider.target;
    if (priceSlider && priceSlider.noUiSlider) {
      priceSlider.noUiSlider.destroy();
    }

    noUiSlider.create(priceSlider, {
      start: priceDefault,
      connect: true,
      range: { min: priceMin, max: priceMax },
    });
    const connectElPrice = priceSlider.querySelector('.noUi-connect') as HTMLDivElement;
    if (this.state.price.length === 2) {
      priceSlider.noUiSlider?.set([...this.state.price]);
    }
    else {
      connectElPrice.classList.add('noUi-connect--unused');
    }
    priceSlider.noUiSlider?.on('update', (values, handle) => {
      const element = priceInputs[handle] as HTMLSpanElement;
      element.innerHTML = Math.floor(+values[handle]).toString();
      const modifiedValues: [number, number] = [Math.floor(+values[0]), Math.floor(+values[1])];
      if (_.isEqual(priceDefault, modifiedValues) && !connectElPrice.classList.contains('noUi-connect--unused')) {
        connectElPrice.classList.add('noUi-connect--unused');
      } else if (!_.isEqual(priceDefault, modifiedValues) && connectElPrice.classList.contains('noUi-connect--unused')) {
        connectElPrice.classList.remove('noUi-connect--unused');
      }
    });
    priceSlider.noUiSlider?.on(
      'update',
      (values) => this.setPriceFilter(
        priceMin,
        priceMax,
        values as [number, number],
      ),
    );
  }

  setPriceFilter(start: number, end: number, values: [number, number]): void {
    const roundedMin: number = Math.floor(values[0]);
    const roundedMax: number = Math.floor(values[1]);
    if (roundedMin > start || roundedMax < end) {
      this.state.price = [roundedMin, roundedMax];
    } else {
      this.state.price = [];
    }
    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
  }
  setStatePrice(): void {
    const minPrice = this.productsForFilter.sort((a, b) => a.price - b.price)[0].price;
    const maxPrice = this.productsForFilter.sort((a, b) => b.price - a.price)[0].price;
    this.state.price = [minPrice, maxPrice];
  }
}
