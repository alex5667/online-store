import { ProductModel } from '../../components/models/product';
export default class ProductCart {
    state: string[];
    cartEl: HTMLDivElement;
    counterEl: HTMLDivElement;
    products: ProductModel[];
    constructor();
    addToCart(e: Event): void;
    private updateCounter;
    private setCartTotal;
}
