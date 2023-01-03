

class ProductInCartsView {


  constructor() {
    this.render();

  }
  render(): void {
    const mainContainer = document.getElementById('main__container') as HTMLDivElement;
    const containerContent = document.createElement('div') as HTMLDivElement;
    containerContent.classList.add('container-content');
    mainContainer.appendChild(containerContent);
    const productInCart = document.createElement('div');
    productInCart.classList.add('product-in-cart');
    containerContent.appendChild(productInCart);
    const headerProductInCart = document.createElement('div') as HTMLDivElement;
    headerProductInCart.classList.add('product-in-cart__header');
    productInCart.appendChild(headerProductInCart);
    const headerH2 = document.createElement('h2');
    headerH2.classList.add('header__h2');
    headerH2.innerText = `Products In Cart`;
    headerProductInCart.appendChild(headerH2);
    const headerLimit = document.createElement('div') as HTMLDivElement;
    headerLimit.classList.add('header__limit');
    const labelInputLimit = document.createElement('label') as HTMLLabelElement;
    labelInputLimit.classList.add('label-input-limit');
    labelInputLimit.innerText = `Limit:`;
    headerLimit.appendChild(labelInputLimit);
    const inputLimit = document.createElement('input') as HTMLInputElement;
    inputLimit.type = 'number';
    inputLimit.id = 'limit';
    inputLimit.min='0';
    headerLimit.appendChild(inputLimit);
    headerProductInCart.appendChild(headerLimit);
    const headerPage = document.createElement('div')as HTMLDivElement;
    headerPage.classList.add('header__page');
    headerPage.innerText = `Page:`;
    headerProductInCart.appendChild(headerPage);
    const contentProductInCart = document.createElement('div')as HTMLDivElement;
    contentProductInCart.classList.add('product-in-cart__content');
    contentProductInCart.id = 'product-in-cart__content';
    productInCart.appendChild(contentProductInCart);
    const summary = document.createElement('div')as HTMLDivElement;
    summary.classList.add('summary');
    containerContent.appendChild(summary);
    const summaryH2 = document.createElement('h2');
    summaryH2.classList.add('summary__title');
    summaryH2.innerText = `Summary`;
    summary.appendChild(summaryH2);
    const summaryProducts = document.createElement('div')as HTMLDivElement;
    summaryProducts.classList.add('summary__products');
    summaryProducts.innerText = ` Products:`
    summary.appendChild(summaryProducts);
    const summaryTotal = document.createElement('div')as HTMLDivElement;
    summaryTotal.classList.add('summary__total');
    summaryTotal.innerText = ` Total:`
    summary.appendChild(summaryTotal);
    const summaryPromo = document.createElement('div')as HTMLDivElement;
    summaryPromo.classList.add('summary__promo');
    summaryPromo.innerText = ` Promo:`
    summary.appendChild(summaryPromo);
    const summaryButton = document.createElement('a');
    summaryButton.classList.add('summary__button');
    summaryButton.innerText = ` BUY NOW`;
    summaryButton.href = '/#/buy';
    summary.appendChild(summaryButton);
  }




}
export default ProductInCartsView;