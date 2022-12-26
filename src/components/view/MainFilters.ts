
export default class MainFilters {
  constructor() {
    this.render();
  }
  render(): void {
    const mainContainer = document.querySelector('.main__container') as HTMLElement;
    const mainFilters = document.createElement('div')
    mainFilters.classList.add('main__filters')
    mainFilters.innerHTML = `
    <button type="reset" class="button filters__reset-button">
      Reset Filters
    </button>
    <div class="filters-checkbox">
      <div class="filter category-filter">
        <p class="filter__title">Category</p>
        <div class="filter__items"></div>
      </div>
      <div class="filter brand-filter">
        <p class="filter__title">Brand</p>
        <div class="filter__items"></div>
      </div>
    </div>
    <div class="range-filters">
      <div class="filter price-filter">
        <span class="filter__title">Price</span>
        <div id="price-filter__slider"></div>
        <div class="filter__values">
            <span id="price-filter__value-min" class="filter__value"></span>
            –
            <span id="price-filter__value-max" class="filter__value"></span>
        </div>
      </div>
      <div class="filter stock-filter">
        <span class="filter__title">Stock</span>
        <div id="stock-filter__slider"></div>
        <div class="filter__values">
            <span id="stock-filter__value-min" class="filter__value"></span>
            –
            <span id="stock-filter__value-max" class="filter__value"></span>
        </div>
      </div>
    </div>
    `
    mainContainer.appendChild(mainFilters);

  }
}