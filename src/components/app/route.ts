import App from "./App";
export interface Routes {
  '404': string;
  '/': string;
  '/pages/details.html': string;
}
export default class Route {
  app:App;
  routes: Routes = {
    '404': "/pages/404.html",
    '/': "/index.html",
    '/pages/details.html': "/pages/details.html",
  };
  constructor() {
    this.start();
    this.app=new App();

  }

  start(): void {
    const details = document.querySelectorAll('.link-button-details') as NodeListOf<HTMLAnchorElement>;
    details.forEach((detail) => detail.addEventListener('click', (e: Event) => this.route(e))
    )

    this.popState();

    // this.domContentLoaded();
  }


  route(event: Event): void {
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    window.history.pushState({}, "", target.href);
    this.handleLocation();
    // this.enableRouteChange();
  }



  handleLocation = async () => {
    const path = window.location.pathname as keyof Routes;
    const mainContainer = document.getElementById('main__container') as HTMLElement;
    mainContainer.innerHTML = '';

    if(path==='/'){
      this.app=new App();
    }else{
      const route = this.routes[path] || this.routes[404];
      const html = await fetch(route).then((data) => data.text());
      const mainContainer = document.getElementById('main__container') as HTMLElement;
      mainContainer.innerHTML = html;

    }


  }

  popState(): void {
    window.addEventListener('popstate',()=> this.handleLocation());
  }

  domLocation() {
    console.log(window.location.pathname)
    // const mainContainer = document.getElementById('main__container') as HTMLElement;
    // console.log(mainContainer)
    // this.enableRouteChange()


    // mainContainer.innerHTML = html;

    // console.log(route)
  }
  domContentLoaded(): void {
    window.addEventListener('DOMContentLoaded', ()=> this.handleLocation());
  }

  // private enableRouteChange() {
  //   window.addEventListener('hashchange', () => {
  //     const hash = window.location.hash;
  //     console.log(hash)
  //     // App.renderNewPage(hash);
  //   });
  // }


}

