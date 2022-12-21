import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';
import { CardsBlock } from './cards-block/cards';
import { UrlPath } from './url';
import { Filters } from './filters-block/filters'
import './main.scss';
import { CardsSort } from './cards-block/sort';
import { UrlSearch } from './filters-block/urlSearch';

export class MainPage implements IComponent {
  execute() {
    const root: HTMLElement | null = document.getElementById('root');
    const urlSearch = new UrlSearch()
    if (root) {
      new Header().create();
      new Main().create();
      new Filters(urlSearch).create();
      new CardsBlock().createCatalog();
      new CardsBlock().createSortPanel();
      new UrlPath().setQuery();
      new CardsSort().sort();
      new Footer().create();
    }
  }
}
