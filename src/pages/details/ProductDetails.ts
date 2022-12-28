import ProductItem from '../../components/ProductItem/ProductItem';
import  {ProductModel}  from '../../components/models/product';

 
class  ProductDetails extends ProductItem{
  constructor(product: ProductModel,){
    super('.main__container', product)
    // this.render();
  }
  render(): void {
      super.render();
  }

}



export default ProductDetails;
