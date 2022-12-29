import ProductItem from '../../components/ProductItem/ProductItem';
import { ProductModel } from '../../components/models/product';


class ProductDetails extends ProductItem {
  constructor(product: ProductModel,) {
    super('.main__container', product)
    // this.render();
  }
  render(): void {
    super.render();
    const productEl= document.querySelector('.product');
    const allProductEl=productEl?.querySelectorAll('*') as NodeListOf<Element>;
    allProductEl.forEach((el)=> el.classList.add('details'));
    const productDescription = document.querySelector('.product__description') as HTMLElement;
    const descriptionsEL = document.createElement('p') as HTMLParagraphElement;
    descriptionsEL.classList.add('product__descriptions')
    const { description }: ProductModel = this.product;
    descriptionsEL.innerText = `Description:${description}`;
    productDescription.insertAdjacentElement('afterbegin', descriptionsEL);
  }

}



export default ProductDetails;
