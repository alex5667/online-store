
export default class CategoryItem{
  category: string;
  templateItem: HTMLTemplateElement;
  sectionElement:HTMLElement;
  element:HTMLElement;

  constructor(ElementSelector: string,category: string){

    this.category=category
    this.sectionElement = document.querySelector(ElementSelector) as HTMLElement;
    this.templateItem = document.getElementById('category-item') as HTMLTemplateElement;
    const clonedNode = document.importNode(this.templateItem.content, true);
    this.element = clonedNode.firstElementChild as HTMLElement;
    this.sectionElement.insertAdjacentElement('afterbegin', this.element);
    this.render();
}
render(): void {
  this.element.innerText = [this.category[0].toUpperCase(), this.category.slice(1)].join('');
}




}
