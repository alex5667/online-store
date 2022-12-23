
export default class CheckboxItem {
   checkboxId: string;
   amount: number;
   category: string;
   templateItem: HTMLTemplateElement;
   sectionElement: HTMLElement;
   element: HTMLLabelElement;
   constructor(ElementSelector: string, category: string, filterType: string, amount: number) {
      this.category = category;
      this.checkboxId = `${filterType}-${category}`;
      this.amount = amount;
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
      const textAmountInCheckbox = this.element.querySelector('.filter-checkbox__text-amount-in-checkbox') as HTMLSpanElement;
      const textAmountInProperty = this.element.querySelector('.filter-checkbox__text-amount-in-property') as HTMLSpanElement;

      labelElement.htmlFor = this.checkboxId;
      checkboxInput.id = this.checkboxId;
      textLabel.innerText = this.category;
      textAmountInCheckbox.id=this.category;
      textAmountInCheckbox.innerText=String(this.amount);
      textAmountInProperty.innerText=String(this.amount);
   }


}
