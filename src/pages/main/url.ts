import { UrlSearch } from './filters-block/urlSearch';

class UrlPath extends UrlSearch {
  params: URLSearchParams;

  constructor() {
    super();
    this.params = new URLSearchParams(window.location.search);
  }
  setQuery() {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        this.setParam('sort', sortOptions.selectedOptions[0].value);
      });
    }
    if (searchInput) {
      searchInput.addEventListener('keyup', (): void => {
        this.setParam('search', searchInput.value);
      });
    }
  }
}

export { UrlPath };
