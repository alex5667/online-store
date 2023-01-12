import { EventListener } from "../../components/ProductItem/ProductItem";
import { ProductModel } from '../../components/models/product';
import './ProductInCarts.scss';
declare class ProductInCarts {
    productsInCart: string[];
    products: ProductModel[];
    listeners: EventListener[];
    listRender: string[];
    constructor(listeners: EventListener[]);
    render(list: string[]): void;
    addCardClass(): void;
    addButtons(elementSelector: string, id: number, action: string): void;
    useButtons(event: Event): void;
    private updateCounter;
    setAmountInButtons(id: number): void;
    setLimit(): void;
    changeRender(): void;
    getRenderList(max: number): string[][];
    summaryProducts(): void;
    summaryTotal(): void;
}
export default ProductInCarts;
