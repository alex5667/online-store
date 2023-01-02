import { ProductModel } from '../models/product';
import ProductCart from '../ProductCart/ProductCart';
import { EventListener } from '../ProductItem/ProductItem';
export type Callback = <T>(data?: T) => void;
export interface Rout {
    path: RegExp;
    cb: (id?: string) => void;
}
export default class Route {
    products: ProductModel[];
    productCart: ProductCart;
    addToCartListener: EventListener;
    routes: Rout[];
    mode: string;
    root: string;
    current: string;
    mainContainer: HTMLElement;
    constructor();
    clearSlashes(path: string): string;
    getFragment(): string;
    listen(): void;
    interval(): void;
    private enableRouteChange;
}
