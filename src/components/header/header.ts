import './header.scss';
export class Header {
  create(): void {
    const body: HTMLBodyElement | null = document.getElementsByTagName('body')[0];
    const header: HTMLElement | null = document.createElement('header');

    const headerBrand: HTMLDivElement | null = document.createElement('div');
    const headerBrandName: HTMLElement | null = document.createElement('h2');

    const headerPrice: HTMLDivElement | null = document.createElement('div');
    const headerPriceTotal: HTMLSpanElement | null = document.createElement('span');

    const headerCart: HTMLDivElement | null = document.createElement('div');
    const headerCartBlock: HTMLDivElement | null = document.createElement('div');
    const headerCartTotal: HTMLDivElement | null = document.createElement('div');

    body.appendChild(header);
    header.classList.add('header');

    header.appendChild(headerBrand);
    headerBrand.classList.add('header__brand');
    headerBrand.addEventListener('click', () => {
      window.location.href = '/';
    });

    headerBrand.appendChild(headerBrandName);
    headerBrandName.classList.add('header__brand__name');
    headerBrandName.innerText = 'Online Store';

    header.appendChild(headerPrice);
    headerPrice.classList.add('header__price');
    headerPrice.appendChild(headerPriceTotal);

    const storagePrice = localStorage.getItem('result');
    headerPriceTotal.innerText = `Total Price: ${storagePrice || 0}€`;

    header.appendChild(headerCart);
    headerCart.classList.add('header__cart');
    headerCart.addEventListener('click', () => {
      window.location.href = '/cart';
    });

    headerCart.appendChild(headerCartBlock);
    headerCartBlock.classList.add('header__cart__block');
    headerCartBlock.appendChild(headerCartTotal);
    headerCartTotal.classList.add('header__cart__total');

    const storageLength = localStorage.getItem('storage-length');
    headerCartTotal.innerText = `${storageLength || 0}`;
  }
}
