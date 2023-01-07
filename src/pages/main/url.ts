import { UrlSearch } from './filters-block/urlSearch';

class UrlPath {
  constructor(private readonly urlSearchService: UrlSearch) {}
  setQuery() {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const smallViewButton = document.querySelector('.view-mode_small');
    const normalViewButton = document.querySelector('.view-mode_big');
    const inputLimitPage: HTMLInputElement | null = document.querySelector('.limit-page__input');

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
    if (smallViewButton) {
      smallViewButton.addEventListener('click', (): void => {
        this.urlSearchService.setParam('small', 'true');
      });
    }
    if (normalViewButton) {
      normalViewButton.addEventListener('click', (): void => {
        this.urlSearchService.setParam('small', 'false');
      });
    }
    if (inputLimitPage) {
      inputLimitPage.addEventListener('input', (): void => {
        this.urlSearchService.setParam('limit', inputLimitPage.value);
      });
    }
  }
}

export { UrlPath };
