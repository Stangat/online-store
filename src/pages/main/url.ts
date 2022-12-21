// Вынес этот файл наружу, чтобы можно было добавлять query-запросы от любых фильтров главной страницы

class UrlPath {
  params: URLSearchParams;

  constructor() {
    this.params = new URLSearchParams(window.location.search);
  }
  setQuery() {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        this.params.set('sort', sortOptions.selectedOptions[0].value);
        window.history.pushState({}, '', `?${this.params.toString()}`);
      });
    }
  }
}

export { UrlPath };
