export default class CheckboxItem {
    checkboxId: string;
    amount: number;
    category: string;
    templateItem: HTMLTemplateElement;
    sectionElement: HTMLElement;
    element: HTMLLabelElement;
    checked: boolean;
    constructor(ElementSelector: string, category: string, filterType: string, amount: number, checked?: boolean);
    render(): void;
}
