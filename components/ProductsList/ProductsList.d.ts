import { ProductModel } from '../models/product';
import { EventListener } from '../ProductItem/ProductItem';
import { Filter } from '../../utils/filter';
import ProductCart from '../ProductCart/ProductCart';
import './ProductsList.scss';
export default class ProductsList {
    products: ProductModel[];
    templateItem: HTMLTemplateElement;
    sectionElement: HTMLElement;
    element: HTMLElement;
    productCart: ProductCart;
    listeners: EventListener[];
    constructor(cart: ProductCart, listeners: EventListener[] | undefined, ElementSelector: string);
    render(): void;
    useFilter(filterState: Filter): void;
    searchFilter(filterState: Filter): void;
    sortFilter(filterState: Filter): void;
    checkboxFilter(filterState: Filter): void;
    rangeFilter(filterState: Filter): void;
}
