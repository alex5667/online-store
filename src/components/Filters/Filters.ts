/* eslint-disable @typescript-eslint/no-unused-vars */
import * as noUiSlider from 'nouislider';
import _ from 'lodash';
import { ProductModel } from '../models/product';
import { STATE_FILTER, Filter } from '../../utils/filter';
import { categories, brands, prices } from '../../db/productsProperties';

import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import ProductsList from '../ProductsList/ProductsList';
import Products from '../../db/products';



export default class Filters {
  categories: string[] = categories;
  brands: string[] = brands;
  prices: number[] = prices;
  priceSlider: noUiSlider.target;
  state: Filter;
  productsList: ProductsList;
  productsForCheckbox: ProductModel[];
  constructor(productsList: ProductsList) {
    const filter: string | null = localStorage.getItem('Filter');
    this.state = filter ? JSON.parse(filter) : STATE_FILTER;
    console.log(STATE_FILTER)
    this.priceSlider = document.getElementById('price-filter__slider') as noUiSlider.target;

    this.productsList = productsList;
    this.productsForCheckbox = Products;
    this.render();
  }
  render(): void {
    this.checkboxFilters();
    this.rangeFilters();
  }

  checkboxFilters(): void {
    categories.forEach((category) => {
      const amount = Products.filter((product) => product.category === category).length;
      let amountfilter = amount;
      if (this.state.category.length > 0) {
        this.state.category.forEach((el) => {
          if (el === category) {
            amountfilter = this.productsForCheckbox.filter((product) => product.category === el).length;
          } else {
            amountfilter = 0;
          }
        })
      }
      new CheckboxItem(
        '.category-filter .filter__items',
        category,
        'category-filter',
        amountfilter,
        amount
      ).element.addEventListener('change', this.setCategoryFilter.bind(this))
    }
    )

    this.brands.forEach((brand) => {
      const amount = Products.filter((product) => product.brand === brand).length;
      let amountfilter = amount;
      if (this.state.brand.length > 0) {
        this.state.brand.forEach((el) => {
          if (el === brand) {
            amountfilter = this.productsForCheckbox.filter((product) => product.brand === el).length;
          } else {
            amountfilter = 0;
          }
        })
      }

      new CheckboxItem(
        '.brand-filter .filter__items',
        brand,
        'brand-filter',
        amountfilter,
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
    this.getProductsForCheckbox(this.state);
    this.setAmountInCheckbox();
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
    this.getProductsForCheckbox(this.state);
    this.setAmountInCheckbox();
  }

  setAmountInCheckbox(): void {
    const amountCheckboxes = document.querySelectorAll('.filter-checkbox__text-amount-in-checkbox') as NodeListOf<HTMLSpanElement>;
    amountCheckboxes.forEach((box) => {
      const labelBox = box.closest('label') as HTMLLabelElement;
      labelBox.classList.remove('lock-input');

      if (categories.includes(box.id)) {
        const amount = this.productsForCheckbox.filter((product) => product.category === box.id).length;
        box.innerText = `${amount}`;
        if (amount === 0) {
          const labelBox = box.closest('label') as HTMLLabelElement;
          labelBox.classList.add('lock-input');
        }
      }
      if (brands.includes(box.id)) {
        const amount = this.productsForCheckbox.filter((product) => product.brand === box.id).length;
        box.innerText = `${amount}`;
        if (amount === 0) {
          const labelBox = box.closest('label') as HTMLLabelElement;
          labelBox.classList.add('lock-input');
        }
      }
    })
  }

  getProductsForCheckbox(state: Filter) {
    const { category, brand }: Filter = state;
    if (category.length > 0 || brand.length > 0) {
      this.productsForCheckbox = Products.filter((product) => {
        if (category.length > 0 && !category.includes(product.category)) return false;
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        return true;
      })
    } else {
      this.productsForCheckbox = Products;
    }
  }
  destroyExistingSlider(){
    if(this.priceSlider && this.priceSlider.noUiSlider){
      this.priceSlider.noUiSlider.destroy();
    }
  }

  rangeFilters(): void {
    const priceMin: number = this.prices[0];
    const priceMax: number = this.prices[this.prices.length - 1];
    const priceDefault: [number, number] = [priceMin, priceMax];
    const priceValues: [HTMLSpanElement, HTMLSpanElement] = [
      document.getElementById('price-filter__value-min') as HTMLSpanElement,
      document.getElementById('price-filter__value-max') as HTMLSpanElement,
    ];
    this.destroyExistingSlider();
    this.priceSlider = document.getElementById('price-filter__slider') as noUiSlider.target;

    noUiSlider.create(this.priceSlider, {
      start: priceDefault,
      connect: true,
      range: { min: priceMin, max: priceMax },
    });
    const connectElPrice = this.priceSlider.querySelector('.noUi-connect') as HTMLDivElement;
    if (this.state.price.length === 2) {
      this.priceSlider.noUiSlider?.set([...this.state.price]);
    } else {
      connectElPrice.classList.add('noUi-connect--unused');
    }
    this.priceSlider.noUiSlider?.on('update', (values, handle) => {
      const element = priceValues[handle] as HTMLSpanElement;
      element.innerHTML = Math.floor(+values[handle]).toString();

      const modifiedValues: [number, number] = [Math.floor(+values[0]), Math.floor(+values[1])];
      if (_.isEqual(priceDefault, modifiedValues) && !connectElPrice.classList.contains('noUi-connect--unused')) {
        connectElPrice.classList.add('noUi-connect--unused');
      } else if (!_.isEqual(priceDefault, modifiedValues) && connectElPrice.classList.contains('noUi-connect--unused')) {
        connectElPrice.classList.remove('noUi-connect--unused');
      }
    });
    this.priceSlider.noUiSlider?.on(
      'change',
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
  }
}
