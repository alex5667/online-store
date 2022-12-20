import products from './products';
import { ProductModel } from '../components/models/product';


export const categories: string[] = products.reduce((acc: string[], cur: ProductModel): string[] => {
  if (!acc.includes(cur.category)) {
    acc.push(cur.category);
  }
  return acc;
}, []);
export const brands: string[] = products.reduce((a: string[], c: ProductModel): string[] => {
  if (!a.includes(c.brand)) a.push(c.brand);
  return a;
}, []).sort((a, b) => a.localeCompare(b));
