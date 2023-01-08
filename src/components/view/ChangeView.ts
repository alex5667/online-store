
export default class ChangeView {
  smallView: HTMLDivElement;
  largeView: HTMLDivElement;

  constructor() {
    this.smallView = document.getElementById('small-view') as HTMLDivElement;
    this.largeView = document.getElementById('large-view') as HTMLDivElement;
    this.changeView();
  }
  private render(num: number, selector: string) {
    for (let i = 0; i <= num; i++) {
      const tile = document.createElement('div') as HTMLDivElement;
      if (selector === 'large-view') {
        tile.classList.add('large-tile');
        this.largeView.appendChild(tile);
      } else {
        tile.classList.add('small-tile');
        this.smallView.appendChild(tile);
      }
    }
  }

  protected changeView(): void {
    this.smallView?.addEventListener('click', (e: Event) => this.addRemoveClasslist(e));
    this.largeView?.addEventListener('click', (e: Event) => this.addRemoveClasslist(e));
    this.render(3, 'large-view');
    this.render(8, 'small-view');
  }
  private addRemoveClasslist(event: Event) {
    const productItems = document.querySelectorAll('.product');
    const target = event.currentTarget as HTMLDivElement;
      productItems.forEach((card) => {
        target.classList.contains('view__small')?card.classList.add('small'):
        card.classList.remove('small');
        const cardEls = card.querySelectorAll('*') as NodeListOf<HTMLElement>;
        cardEls.forEach((el) => {
          target.classList.contains('view__small')?el.classList.add('small'):
          el.classList.remove('small');
        })
      });
  }
}