
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
      const labelElement: HTMLLabelElement = this.element;
      const checkboxInput = this.element.querySelector('.filter-checkbox__input') as HTMLInputElement;
      const textLabel = this.element.querySelector('.filter-checkbox__text-label') as HTMLSpanElement;
      labelElement.htmlFor = this.checkboxId;
      checkboxInput.id = this.checkboxId;
      textLabel.innerText = this.category;
      if (this.checked) {
         checkboxInput.checked = true;
      }
   }


}
