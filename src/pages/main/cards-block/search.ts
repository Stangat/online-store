import { FiltersBlockValue, IProductData } from '../../../interfaces/index';
import { Filters } from '../filters-block/filters';
import { CardsBlock } from './cards';

export class Search extends CardsBlock {
  filters: Filters;

  constructor(filters: Filters) {
    super();
    this.filters = filters;
  }
  findItems(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const NON_EXISTENT_VALUE = -1;
    if (searchInput) {
      searchInput.addEventListener('keyup', () => {
        const selectedData: IProductData[] = [];
        const searchValue = searchInput.value.toUpperCase();
        this.filters.products.forEach((product) => {
          const title = product.title;
          const description = product.description;
          const price = product.price.toString();
          const discount = product.discountPercentage.toString();
          const rating = product.rating.toString();
          const stock = product.stock.toString();
          const brand = product.brand;
          const category = product.category;
          if (
            title.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            description.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            price.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            discount.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            rating.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            stock.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            brand.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE ||
            category.toUpperCase().indexOf(searchValue) > NON_EXISTENT_VALUE
          ) {
            selectedData.push(product);
          }
        });
        this.filters.updateCategoriesCounts(selectedData);
        this.filters.updateBrandsCounts(selectedData);

        this.applySort(selectedData);
        super.notify(selectedData);
        this.setLocalStorage();
      });
    }
    this.getLocalStorage();
    this.clearLocalStorage();
    this.retainLastSearchAfterPageRefresh();
  }

  applySort(data: IProductData[]) {
    if (window.location.search.includes('sort=price-ASC')) {
      data.sort((a, b) => a.price - b.price);
    }
    if (window.location.search.includes('sort=price-DESC')) {
      data.sort((a, b) => b.price - a.price);
    }
    if (window.location.search.includes('sort=discount-ASC')) {
      data.sort((a, b) => a.discountPercentage - b.discountPercentage);
    }
    if (window.location.search.includes('sort=discount-DESC')) {
      data.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }
    if (window.location.search.includes('sort=rating-ASC')) {
      data.sort((a, b) => a.rating - b.rating);
    }
    if (window.location.search.includes('sort=rating-DESC')) {
      data.sort((a, b) => b.rating - a.rating);
    }
  }

  setLocalStorage(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    if (searchInput) {
      const value = searchInput.value;
      localStorage.setItem('input', value);
    }
  }

  getLocalStorage(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    if (searchInput) {
      const value = localStorage.getItem('input');
      if (value) {
        searchInput.value = value;
      }
    }
  }

  clearLocalStorage(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    if (!searchInput?.value) {
      localStorage.removeItem('input');
    }
  }

  retainLastSearchAfterPageRefresh(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');

    if (searchInput) {
      const selectedData: IProductData[] = [];
      const searchValue = searchInput.value.toUpperCase();
      this.filters.products.forEach((product) => {
        const title = product.title;
        const description = product.description;
        const price = product.price.toString();
        const discount = product.discountPercentage.toString();
        const rating = product.rating.toString();
        const stock = product.stock.toString();
        const brand = product.brand;
        const category = product.category;
        if (
          title.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          description.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          price.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          discount.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          rating.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          stock.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          brand.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing ||
          category.toUpperCase().indexOf(searchValue) > FiltersBlockValue.element_missing
        ) {
          selectedData.push(product);
        }
      });
      this.filters.updateBrandsCounts(selectedData);
      this.filters.updateCategoriesCounts(selectedData);
      this.applySort(selectedData);
      super.notify(selectedData);
    }
  }
}
