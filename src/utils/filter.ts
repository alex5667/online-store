
export enum SortFilter {
  PRICE = 'PRICE',
  PRICE_REVERSE = 'PRICE_REVERSE',

}
export interface Filter {
  category: string[];
  brand: string[];
  price: [number, number] | [];
  quantity: [number, number] | [];
  sort: SortFilter;

}

export const STATE_FILTER: Filter = {
  category: [],
  brand: [],
  price: [],
  quantity: [],
  sort: SortFilter.PRICE
}
