import './global.scss';
import { Cart } from './pages/cart/cart';
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
    product.execute(+path.split('/')[2]);
    break;
  default:
    notFound.execute();
}
