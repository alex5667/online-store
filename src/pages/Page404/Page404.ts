
export default class Page404{
  constructor(){
    this.render();
  }

  render(){
    const divContent= document.createElement('div');
    const title=document.createElement('h1');
    title.innerText='Пиздец';
    divContent.appendChild(title);
    const mainContainer = document.querySelector('.main__container');
    mainContainer?.appendChild(divContent);
  }

}