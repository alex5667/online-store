import ProductItem, { EventListener } from '../../components/ProductItem/ProductItem';
import { ProductModel } from '../../components/models/product';
import './ProductDetails.scss';
declare class ProductDetails extends ProductItem {
    constructor(product: ProductModel, addToCartListener: EventListener[]);
    render(): void;
}
export default ProductDetails;
