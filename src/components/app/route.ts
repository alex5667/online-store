
export interface Routes {
  404: string;
  home: string;
  detail: string;
}
export default class Route {
  routes: Routes = {
    404: "/pages/404.html",
    home: "/../index.html",
    detail: "/pages/details.html",
  };
  constructor() {
    this.start();
    

  }

  start(): void {
    const details = document.querySelectorAll('.link-button-details') as NodeListOf<HTMLAnchorElement>;
    details.forEach((detail) => detail.addEventListener('click', (e:Event) => this.route(e))
    )
    this.handleLocation();
  }


  route(event: Event): void {
    event = event || window.event;
    event.preventDefault();
    const target = event.target as HTMLAnchorElement;
    window.history.pushState({}, "",target.href);
    this.handleLocation();
  }



  handleLocation = async () => {
    const path = window.location.pathname;

    console.log(path)
    const route = this.routes.detail|| this.routes[404];
    // const html = await fetch(route).then((data) => data.text());
    // const mainContainer = document.getElementById('main__container') as HTMLElement;
    // mainContainer.innerHTML = '';
    // mainContainer.innerHTML = html;
  }

  // window.onpopstate = handleLocation;
  // window.route = route;

}

