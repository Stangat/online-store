import { Filters } from '../filters-block/filters';
import { CardsBlock } from './cards';
import { Search } from './search';

export class CardsSort extends CardsBlock {
  filters: Filters;
  searchInput: HTMLInputElement | null;
  sortOptions: HTMLSelectElement | null;
  search: Search;

  constructor(filters: Filters) {
    super();
    this.filters = filters;
    this.search = new Search(filters);
    this.searchInput = document.querySelector('.search-bar__input');
    this.sortOptions = document.querySelector('.selector');
  }

  sort(): void {
    this.handleSelectedAttribute();
    if (this.sortOptions) {
      this.sortOptions.addEventListener('change', (): void => {
        this.sortByPriceAsc();
        this.sortByPriceDesc();
        this.sortByRatingAsc();
        this.sortByRatingDesc();
        this.sortByDiscountAsc();
        this.sortByDiscountDesc();
      });
    }
  }

  handleSelectedAttribute(): void {
    enum sortNumber {
      ByPriceAsc = 1,
      ByPriceDesc,
      byRatingAsc,
      byRatingDesc,
      byDiscountAsc,
      byDiscountDesc,
    }

    if (this.sortOptions) {
      switch (true) {
        case window.location.search.includes('sort=price-ASC'):
          this.sortOptions.options[sortNumber.ByPriceAsc].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=price-DESC'):
          this.sortOptions.options[sortNumber.ByPriceDesc].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-ASC'):
          this.sortOptions.options[sortNumber.byRatingAsc].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-DESC'):
          this.sortOptions.options[sortNumber.byRatingDesc].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-ASC'):
          this.sortOptions.options[sortNumber.byDiscountAsc].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-DESC'):
          this.sortOptions.options[sortNumber.byDiscountDesc].setAttribute('selected', '');
          break;
      }
    }
  }

  sortByPriceAsc(): void {
    if (window.location.search.includes('sort=price-ASC')) {
      this.filters.products.sort((a, b) => a.price - b.price);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }

  sortByPriceDesc(): void {
    if (window.location.search.includes('sort=price-DESC')) {
      this.filters.products.sort((a, b) => b.price - a.price);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }

  sortByDiscountAsc(): void {
    if (window.location.search.includes('sort=discount-ASC')) {
      this.filters.products.sort((a, b) => a.discountPercentage - b.discountPercentage);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }

  sortByDiscountDesc(): void {
    if (window.location.search.includes('sort=discount-DESC')) {
      this.filters.products.sort((a, b) => b.discountPercentage - a.discountPercentage);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }

  sortByRatingAsc(): void {
    if (window.location.search.includes('sort=rating-ASC')) {
      this.filters.products.sort((a, b) => a.rating - b.rating);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }

  sortByRatingDesc(): void {
    if (window.location.search.includes('sort=rating-DESC')) {
      this.filters.products.sort((a, b) => b.rating - a.rating);
      super.notify(this.filters.products);
      if (window.location.search.includes('search')) {
        this.search.retainLastSearchAfterPageRefresh();
      }
    }
  }
}
