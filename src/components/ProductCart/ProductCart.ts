

const CART_STATE: string[] = [];

export default class ProductCart {
  state:string[];
  cartEl:HTMLDivElement;
  counterEl: HTMLDivElement;

  constructor() {
    const savedCart = localStorage.getItem('productCart');
    this.state = savedCart ? JSON.parse(savedCart) : CART_STATE;
    this.cartEl = document.querySelector('.cart') as HTMLDivElement;
    const counter = document.createElement('div');
    counter.classList.add('cart-counter');
    this.counterEl = counter;
    this.counterEl.innerHTML=`${this.state.length}`;
    this.cartEl.append(counter);
  }

  public addToCart(e: Event): void {
    let target = e.target as HTMLElement;

    while (!target.id) {
      target = target.parentElement as HTMLElement;
    }
    const addToCartBtn = target.querySelector('.link-button-add-to-cart') as HTMLButtonElement;
    if (!this.state.includes(target.id)) {

      this.state = [...this.state, target.id];

      localStorage.setItem('productCart', JSON.stringify(this.state));
      target.classList.add('product--in-cart');
      addToCartBtn.innerText = 'Remove';

    } else {
      this.state = this.state.filter((id) => id !== target.id);
      target.classList.remove('product--in-cart');
      addToCartBtn.innerText = 'Add to cart';
    }
    this.updateCounter();
  }


   private updateCounter(): void {
    this.counterEl.innerHTML='';
    if (this.state.length > 0) {
      this.counterEl.innerHTML = `${this.state.length}`;
      // this.counterEl.style.display = 'block';
    } else {
      this.counterEl.innerHTML = `${this.state.length}`;
      // this.counterEl.style.display = 'none';
    }
  }

}