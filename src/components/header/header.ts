import './header.scss';
import '../../assets/header-cart.svg';
import '../../assets/header-sale-bag.svg';

export class Header {
  create() {
    const body: HTMLBodyElement | null = document.getElementsByTagName('body')[0];
    const header: HTMLElement | null = document.createElement('header');

    const headerBrand: HTMLDivElement | null = document.createElement('div');
    const headerBrandLogo: HTMLImageElement | null = document.createElement('img');
    const headerBrandName: HTMLElement | null = document.createElement('h2');

    const headerPrice: HTMLDivElement | null = document.createElement('div');
    const headerPriceTotal: HTMLSpanElement | null = document.createElement('span');

    const headerCart: HTMLDivElement | null = document.createElement('div');
    const headerCartImage: HTMLImageElement | null = document.createElement('img');
    const headerCartTotal: HTMLSpanElement | null = document.createElement('span');

    body.appendChild(header);
    header.classList.add('header');

    header.appendChild(headerBrand);
    headerBrand.classList.add('header__brand');
    headerBrand.appendChild(headerBrandLogo);
    headerBrandLogo.classList.add('header__brand__logo');
    headerBrandLogo.src = 'header-sale-bag.svg';
    headerBrand.appendChild(headerBrandName);
    headerBrandName.classList.add('header__brand__name');
    headerBrandName.innerText = 'Online Store';

    header.appendChild(headerPrice);
    headerPrice.classList.add('header__price');
    headerPrice.appendChild(headerPriceTotal);
    headerPriceTotal.innerText = 'Total Price: 0$';

    header.appendChild(headerCart);
    headerCart.classList.add('header__cart');
    headerCart.appendChild(headerCartImage);
    headerCartImage.classList.add('header__cart__image');
    headerCartImage.src = 'header-cart.svg';
    headerCart.appendChild(headerCartTotal);
    headerCartTotal.classList.add('header__cart__total');
    headerCartTotal.innerText = '0';
  }
}
