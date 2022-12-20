import products from './products';
import { ProductModel } from '../components/models/product';


export const categories: string[] = products.reduce((acc: string[], cur: ProductModel): string[] => {
  if (!acc.includes(cur.category)) {
    acc.push(cur.category);
  }
  return acc;
}, []);
export const brands: string[] = products.reduce((acc: string[], cur: ProductModel): string[] => {
  if (!acc.includes(cur.brand)) {
    acc.push(cur.brand);
  }
  return acc;
}, []);
