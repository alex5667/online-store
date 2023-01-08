export default class MainContent {
  constructor(){
    this.render();
  }
  render(): void {
    const mainContainer = document.querySelector('.main__container') as HTMLElement;
    const mainContent = document.createElement('div');
    mainContent.id='main__content';
    mainContent.classList.add('main__content');
    mainContent.innerHTML = `
    <div class="content__sort-filter">
      <select name="sort" id="sort-filter" class="sort-filter">
        <option value="DEFAULT">Sort options</option>
        <option value="PRICE">Sort by price ASC</option>
        <option value="PRICE_REVERSE">Sort by price DESC</option>
        <option value="RATING">Sort by rating ASC</option>
        <option value="RATING_REVERSE">Sort by rating DESC</option>
        <option value="DISCOUNT">Sort by discount ASC</option>
        <option value="DISCOUNT_REVERSE">Sort by discount DESC</option>
      </select>
      <span class="found" id="found">
        Found:
      </span>
      <input type="search" id="search-filter" class="search-filter" placeholder="Search product"
        autocomplete="off" />
      <div class="change-view">
        <div  id="small-view" class="button-view view__small">
        </div>
        <div  id="large-view" class="button-view view__large">
          
        </div>
      </div>
    </div>
    `
    mainContainer.appendChild(mainContent);

  }
}