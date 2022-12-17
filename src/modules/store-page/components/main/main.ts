import './main.scss';
export class Main {
  create() {
    const body: HTMLBodyElement | null = document.getElementsByTagName('body')[0];
    const main: HTMLElement | null = document.createElement('main');

    body.appendChild(main);
    main.classList.add('main');
  }
}
