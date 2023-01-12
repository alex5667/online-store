export default class CategoryItem {
    category: string;
    templateItem: HTMLTemplateElement;
    sectionElement: HTMLElement;
    element: HTMLElement;
    constructor(ElementSelector: string, category: string);
    render(): void;
}
