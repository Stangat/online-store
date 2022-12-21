import './global.scss';
import { Cart } from './pages/cart/cart';
import { CardsSort } from './pages/main/cards-block/sort';
import { MainPage } from './pages/main/main';
import { NotFound } from './pages/not-found/not-found';
import { Product } from './pages/product-details/product';
const path: string = window.location.pathname;

const cart = new Cart();
const main = new MainPage();
const notFound = new NotFound();
const product = new Product();

switch (true) {
  case path === '/cart':
    cart.execute();
    break;
  case path === '/':
    main.execute();
    break;
  case path.startsWith('/product/'):
    const productId = path.split('/')[2];
    product.execute(+productId);
    break;
  default:
    notFound.execute();
}
