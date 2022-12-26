import { UrlSearch } from './filters-block/urlSearch';

class UrlPath {
  constructor(private readonly urlSearchService: UrlSearch) {}
  setQuery() {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        this.urlSearchService.setParam('sort', sortOptions.selectedOptions[0].value);
      });
    }
    if (searchInput) {
      searchInput.addEventListener('keyup', (): void => {
        this.urlSearchService.setParam('search', searchInput.value);
      });
    }
  }
}

export { UrlPath };
