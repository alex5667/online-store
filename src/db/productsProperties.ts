import products from './products';
import { ProductModel } from '../components/models/product';


export const categories: string[] = products.reduce((acc: string[], cur: ProductModel): string[] => {
  if (!acc.includes(cur.category)) {
    acc.push(cur.category);
  }
  return acc;
}, []).sort((a, b) => b.localeCompare(a));
export const brands: string[] = products.reduce((a: string[], c: ProductModel): string[] => {
  if (!a.includes(c.brand)) a.push(c.brand);
  return a;
}, []).sort((a, b) => b.localeCompare(a));

export const prices: number[] = products.reduce((a: number[], c: ProductModel): number[] => {
  if (!a.includes(c.price)) a.push(c.price);
  return a;
}, []).sort((a, b) => +a - +b);

export const quantities: number[] = products.reduce((a: number[], c: ProductModel): number[] => {
  if (!a.includes(c.stock)) a.push(c.stock);
  return a;
}, []).sort((a, b) => +a - +b);
