export interface Filter {
  category: string[];
  brand: string[];
  price: [number, number] | [];
  quantity: [number, number] | [];

  
}

export const STATE_FILTER: Filter = {
  category: [],
  brand: [],
  price: [],
  quantity: []
}
