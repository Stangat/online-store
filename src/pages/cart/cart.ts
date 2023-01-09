import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';
import { UrlSearch } from '../main/filters-block/urlSearch';
import { UrlPath } from '../main/url';
import { CartMain } from './cart-main-block';
import { Form } from './modal';

export class Cart implements IComponent {
  execute() {
    const root: HTMLElement | null = document.getElementById('root');
    if (root) {
      new Header().create();
      new Main().create();
      new CartMain().create();
      new UrlPath(new UrlSearch).setQuery();
      new Form().showModal();
      new Footer().create();
    }
  }
}
