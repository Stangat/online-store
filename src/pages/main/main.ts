import { Footer } from '../../components/footer/footer';
import { Header } from '../../components/header/header';
import { Main } from '../../components/main/main';
import { IComponent } from '../../interfaces/index';
import { CardsBlock } from './cards-block/cards';
import { UrlPath } from './url';
import { Filters } from './filters-block/filters';
import './main.scss';
import { CardsSort } from './cards-block/sort';
import { UrlSearch } from './filters-block/urlSearch';
import { Search } from './cards-block/search';

export class MainPage implements IComponent {
  execute() {
    const root: HTMLElement | null = document.getElementById('root');
    const main = new Main();
    const urlSearch = new UrlSearch();
    const cardBlock = new CardsBlock();
    const filters = new Filters(urlSearch, cardBlock, [cardBlock]);
    if (root) {
      new Header().create();
      main.create();
      filters.create();
      cardBlock.createCatalog(filters.products);
      cardBlock.createSortPanel();
      new UrlPath(urlSearch).setQuery();
      new CardsSort(filters).sort();
      new Search().findItems();
      new Footer().create();
    }
  }
}
