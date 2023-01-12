import { ProductModel } from '../models/product';
import './ProductItem.scss';
export type EventListener = [string, (e: Event) => void];
export default class ProductItem {
    product: ProductModel;
    templateItem: HTMLTemplateElement;
    sectionElement: HTMLElement;
    element: HTMLElement;
    isInCart: boolean;
    listeners: EventListener[];
    constructor(ElementSelector: string, product: ProductModel, isInCart: boolean, listeners: EventListener[]);
    protected render(): void;
    private useListeners;
    private onMouseProduct;
    private visibilityElement;
}
