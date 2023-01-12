import MainFilters from '../view/MainFilters';
import MainContent from '../view/MainContent';
import ProductsList from '../ProductsList/ProductsList';
import Filters from '../Filters/Filters';
import ProductCart from '../ProductCart/ProductCart';
import { EventListener } from '../ProductItem/ProductItem';
export default class App {
    mainFilters: MainFilters;
    mainContent: MainContent;
    productsList: ProductsList;
    filters: Filters;
    constructor(productCart: ProductCart, addToCartListener: EventListener[]);
    render(): void;
}
