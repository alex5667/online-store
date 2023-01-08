/* eslint-disable @typescript-eslint/no-unused-vars */
import * as noUiSlider from 'nouislider';
import _ from 'lodash';
import { ProductModel } from '../models/product';
import { SortFilter, STATE_FILTER, Filter } from '../../utils/filter';
import { categories, brands, prices, quantities } from '../../db/productsProperties';
import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import ProductsList from '../ProductsList/ProductsList';
import Products from '../../db/products';
import './Filters.scss'



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
    this.rangeFilters(this.prices, this.state.price);
    this.rangeFilters(this.quantities, this.state.quantity);
    this.sortFilters();
    this.searchFilter();
    this.resetFilter();
    this.setAmountProducts();
    this.changeView();

  }
  resetFilter(): void {
    const resetBtn = document.querySelector('.filters__reset-button') as HTMLButtonElement;
    resetBtn.addEventListener('click', () => this.resetFilters());
  }


  resetFilters(): void {
    this.state = {
      category: [],
      brand: [],
      price: [],
      quantity: [],
      sort: SortFilter.DEFAULT,
      search: '',
    };
    localStorage.removeItem('Filter');
    const filters = document.querySelectorAll('.filter__items') as NodeListOf<HTMLElement>;
    filters.forEach((filter: HTMLElement) => {
      while (filter.hasChildNodes()) {
        filter.removeChild(filter.children[0]);
      }
    }
    )
    this.render()
    this.productsList.useFilter(this.state);
  }

  sortFilters(): void {
    const sortInput = document.getElementById('sort-filter') as HTMLSelectElement;
    sortInput.value = this.state.sort;
    sortInput.addEventListener('change', (e: Event) => this.setSortFilter(e.target as HTMLSelectElement));
  }

  setSortFilter(select: HTMLSelectElement): void {
    const { value }: { value: string } = select;
    this.state = {
      ...this.state,
      sort: value as SortFilter,
    };
    this.productsList.useFilter(this.state);
  }
  searchFilter(): void {
    const searchInput = document.getElementById('search-filter') as HTMLInputElement;
    searchInput.focus();
    searchInput.value = this.state.search !== '' ? this.state.search : '';
    const callback = (e: Event): void => this.setSearchFilter(e);

    searchInput.addEventListener('input', this.debounce(callback, 500));
  }

  debounce<T extends (...params: Event[]) => void>(fn: T, ms: number) {
    let timeout: NodeJS.Timeout;
    return function (this: Event, ...args: Event[]) {
      const fnCall = () => { fn.apply(this, args) };
      clearTimeout(timeout);
      timeout = setTimeout(fnCall, ms)
    }

  }

  setSearchFilter(e: Event): void {
    const target = e.target as HTMLInputElement;
    if (target.value) {
      this.state.search = target.value;
    } else {
      this.state.search = '';
    }
    this.productsList.useFilter(this.state);
  }



  checkboxFilters(): void {
    categories.forEach((category) => {
      const amount = Products.filter((product) => product.category === category).length;
      new CheckboxItem(
        '.category-filter .filter__items',
        category,
        'category-filter',
        amount,
        this.state.category.includes(category),

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
        this.state.brand.includes(brand),
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
      this.state.quantity = [];
    } else {
      this.state.category = this.state.category.filter((el) => el !== category);
      this.state.price = [];
      this.state.quantity = [];
    }
    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
    this.rangeFilters(this.prices, this.state.price);
    this.rangeFilters(this.quantities, this.state.quantity);


  }

  setBrandFilter(e: Event): void {
    const checkboxLabel = e.currentTarget as HTMLLabelElement;
    const checkbox = e.target as HTMLInputElement;
    const checkboxSpan = checkboxLabel?.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
    const brand = checkboxSpan.innerText.trim();
    if (checkbox.checked) {
      this.state.brand.push(brand);
      this.state.price = [];
      this.state.quantity = [];
    } else {
      this.state.brand = this.state.brand.filter((el) => el !== brand);
      this.state.price = [];
      this.state.quantity = [];
    }
    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
    this.rangeFilters(this.prices, this.state.price);
    this.rangeFilters(this.quantities, this.state.quantity);
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
    const { category, brand, price, quantity }: Filter = state;
    if (category.length > 0 || brand.length > 0 || price.length === 2 || quantity.length === 2) {
      this.productsForFilter = Products.filter((product) => {
        if (category.length > 0 && !category.includes(product.category)) return false;
        if (brand.length > 0 && !brand.includes(product.brand)) return false;
        if (price.length === 2) {
          if (price[0] > product.price) return false;
          if (price[1] < product.price) return false;
        }
        if (quantity.length === 2) {
          if (quantity[0] > product.stock) return false;
          if (quantity[1] < product.stock) return false;
        }
        return true;
      })
    } else {
      this.productsForFilter = Products;
    }
    this.setStatePrice();
    this.setAmountProducts();
  }
  setAmountProducts() {
    const found = document.getElementById('found') as HTMLSpanElement;
    const amount = this.productsForFilter.length;
    found.innerText = `Found: ${amount}`;
  }




  rangeFilters(prop: number[], state: [number, number] | []): void {
    const selector = prop === this.prices ? `price` : `stock`;
    const Min: number = prop[0];
    const Max: number = prop[prop.length - 1];
    const DefaultMin = state[0] ? state[0] : Min;
    const DefaultMax = state[1] ? state[1] : Max;
    const Default: [number, number] = [DefaultMin, DefaultMax];
    const Inputs: [HTMLSpanElement, HTMLSpanElement] = [
      document.getElementById(`${selector}-filter__value-min`) as HTMLSpanElement,
      document.getElementById(`${selector}-filter__value-max`) as HTMLSpanElement,
    ];

    const Slider = document.getElementById(`${selector}-filter__slider`) as noUiSlider.target;
    if (Slider && Slider.noUiSlider) {
      Slider.noUiSlider.destroy();
    }

    noUiSlider.create(Slider, {
      start: Default,
      connect: true,
      range: { min: Min, max: Max },
    });
    const connectEl = Slider.querySelector('.noUi-connect') as HTMLDivElement;
    if (state.length === 2) {
      Slider.noUiSlider?.set([...state]);
    }
    else {
      connectEl.classList.add('noUi-connect--unused');
    }
    Slider.noUiSlider?.on('update', (values, handle) => {
      const element = Inputs[handle] as HTMLSpanElement;
      element.innerHTML = Math.floor(+values[handle]).toString();
      const modifiedValues: [number, number] = [Math.floor(+values[0]), Math.floor(+values[1])];
      if (_.isEqual(Default, modifiedValues) && !connectEl.classList.contains('noUi-connect--unused')) {
        connectEl.classList.add('noUi-connect--unused');
      } else if (!_.isEqual(Default, modifiedValues) && connectEl.classList.contains('noUi-connect--unused')) {
        connectEl.classList.remove('noUi-connect--unused');
      }
    });
    Slider.noUiSlider?.on(
      'update',
      (values) => this.setFilterRange(
        Min,
        Max,
        values as [number, number],
        selector
      ),
    );
  }

  setFilterRange(start: number, end: number, values: [number, number], selector: string): void {

    const roundedMin: number = Math.floor(values[0]);
    const roundedMax: number = Math.floor(values[1]);
    if (roundedMin > start || roundedMax < end) {
      selector === 'price' ? this.state.price = [roundedMin, roundedMax] : this.state.quantity = [roundedMin, roundedMax];
    } else {
      selector === 'price' ? this.state.price = [] : this.state.quantity = [];
    }

    this.productsList.useFilter(this.state);
    this.getProductsForFilter(this.state);
    this.setAmountInCheckbox();
  }
  setStatePrice(): void {
    const minPrice = this.productsForFilter.sort((a, b) => a.price - b.price)[0].price;
    const maxPrice = this.productsForFilter.sort((a, b) => b.price - a.price)[0].price;
    const minQuantity = this.productsForFilter.sort((a, b) => a.stock - b.stock)[0].stock;
    const maxQuantity = this.productsForFilter.sort((a, b) => b.stock - a.stock)[0].stock;
    this.state.price = [minPrice, maxPrice];
    this.state.quantity = [minQuantity, maxQuantity];
  }
  changeView(): void {
    const smallView = document.getElementById('small-view');
    const largeView = document.getElementById('large-view');
    smallView?.addEventListener('click', () => {
      const productItems = document.querySelectorAll('.product')
      productItems.forEach((card) => card.classList.remove('large'))
      productItems.forEach((card) => card.classList.add('small'))
    });
    largeView?.addEventListener('click', () => {
      const productItems = document.querySelectorAll('.product')
      productItems.forEach((card) => card.classList.remove('small'))
      productItems.forEach((card) => card.classList.add('large'))
    });
  }
}
