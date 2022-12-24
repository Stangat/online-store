// Вынес этот файл наружу, чтобы можно было добавлять query-запросы от любых фильтров главной страницы

import { UrlSearch } from "./filters-block/urlSearch";


class UrlPath extends UrlSearch {
  params: URLSearchParams;

  constructor() {
    super()
    this.params = new URLSearchParams(window.location.search);
    
  }
  setQuery() {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        this.setParam('sort', sortOptions.selectedOptions[0].value)
        // this.params.set('sort', sortOptions.selectedOptions[0].value);
        // window.history.pushState({}, '', `?${this.params.toString()}`);
      });
    }
  }
}

export { UrlPath };
