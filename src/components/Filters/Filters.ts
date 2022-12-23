import CheckboxItem from '../Filters/Checkbox/CheckboxItem';
import { categories, brands } from '../../db/productsProperties';
import ProductsList from '../ProductsList/ProductsList';
import { STATE_FILTER, Filter } from '../models/filter';
import Products from '../../db/products';
import { ProductModel } from '../models/product'

export default class Filters {
  categories: string[] = categories;
  brands: string[] = brands;
  state: Filter;
  productsList: ProductsList;
  productsForCheckbox: ProductModel[];
  constructor(productsList: ProductsList) {
    const filter: string | null = localStorage.getItem('Filter');
    this.state = filter ? JSON.parse(filter) : STATE_FILTER;
    this.productsList = productsList;
    this.productsForCheckbox = Products;
    this.render();
  }
  render(): void {
    this.checkboxFilters();
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
            console.log(amountfilter)
          } else {
            amountfilter = 0;
            console.log(amountfilter)
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
        const labelBox=box.closest('label') as HTMLLabelElement;
        labelBox.classList.remove('lock-input');
        console.log(this.productsForCheckbox)

      if(categories.includes(box.id)){
        const amount = this.productsForCheckbox.filter((product) => product.category === box.id).length;
        box.innerText = `${amount}`;
        if(amount===0){
          const labelBox=box.closest('label') as HTMLLabelElement;
          labelBox.classList.add('lock-input');
        }
      }
      if(brands.includes(box.id)){
        const amount = this.productsForCheckbox.filter((product) => product.brand === box.id).length;
        box.innerText = `${amount}`;
        if(amount===0){
          const labelBox=box.closest('label') as HTMLLabelElement;
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
    }else{
      this.productsForCheckbox=Products;
    }
  }
}
