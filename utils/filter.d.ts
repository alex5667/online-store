export declare enum SortFilter {
    DEFAULT = "DEFAULT",
    PRICE = "PRICE",
    PRICE_REVERSE = "PRICE_REVERSE",
    RATING = "RATING",
    RATING_REVERSE = "RATING_REVERSE",
    DISCOUNT = "DISCOUNT",
    DISCOUNT_REVERSE = "DISCOUNT_REVERSE"
}
export interface Filter {
    category: string[];
    brand: string[];
    price: [number, number] | [];
    quantity: [number, number] | [];
    sort: SortFilter;
    search: string;
}
export declare const STATE_FILTER: Filter;
