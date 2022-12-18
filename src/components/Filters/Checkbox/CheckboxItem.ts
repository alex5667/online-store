
export default class CheckboxItem {
   checkboxId: string;
   checked: boolean;
   category: string;
   templateItem: HTMLTemplateElement;
   sectionElement: HTMLElement;
   element: HTMLLabelElement;
   constructor(ElementSelector: string, category: string, filterType: string, checked: boolean) {
      this.category = category;
      this.checkboxId = `${filterType}-${category}`;
      this.checked = checked;
      this.sectionElement = document.querySelector(ElementSelector) as HTMLElement;
      this.templateItem = document.getElementById('filter-checkbox') as HTMLTemplateElement;
      const clonedNode = document.importNode(this.templateItem.content, true);
      this.element = clonedNode.firstElementChild as HTMLLabelElement;
      this.sectionElement.insertAdjacentElement('afterbegin', this.element);
      this.render();
   }
   render(): void {
      const labelEl: HTMLLabelElement = this.element;
      const checkbox = this.element.querySelector('.filter-checkbox__input') as HTMLInputElement;
      const textLabel = this.element.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
      labelEl.htmlFor = this.checkboxId;
      checkbox.id = this.checkboxId;
      textLabel.innerText = [this.category[0].toUpperCase(), this.category.slice(1)].join('');
      if (this.checked) {
         checkbox.checked = true;
      }
   }


}
