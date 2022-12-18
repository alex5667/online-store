import CategoryItem from '../CategoryItem/CategoryItem';

export default class CategoryList{
  categories: string[];
  element: HTMLElement;
  sectionElement: HTMLElement;
  templateItem: HTMLTemplateElement;


  constructor(categories: string[]){
    this.categories = categories;
    this.sectionElement = document.querySelector('.main__filtres') as HTMLElement;
    this.templateItem = document.getElementById('categories-list') as HTMLTemplateElement;
    const clonedNode = document.importNode(this.templateItem.content, true);
    this.element = clonedNode.firstElementChild as HTMLElement;
    this.sectionElement.insertAdjacentElement('afterbegin', this.element);
  }
  render(): void {
    if (this.categories.length > 0) {
      this.categories.forEach((category) => new CategoryItem('.categories',category));
  }

  }
}

