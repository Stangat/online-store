import { onlineStoreData } from '../../../data/data';
import { IProductData } from '../../../interfaces/index';
import { Filters } from '../filters-block/filters';
import { CardsBlock } from './cards';

class CardsSort extends CardsBlock {
  filters: Filters;
  searchInput: HTMLInputElement | null;
  sortOptions: HTMLSelectElement | null;

  constructor(filters: Filters) {
    super();
    this.filters = filters;
    this.searchInput = document.querySelector('.search-bar__input');
    this.sortOptions = document.querySelector('.selector');
  }

  sort(): void {
    this.handleSelectedAttribute();
    // this.sortByPriceAsc();
    // this.sortByPriceDesc();
    // this.sortByRatingAsc();
    // this.sortByRatingDesc();
    // this.sortByDiscountAsc();
    // this.sortByDiscountDesc();
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
    if (this.sortOptions) {
      switch (true) {
        case window.location.search.includes('sort=price-ASC'):
          this.sortOptions.options[1].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=price-DESC'):
          this.sortOptions.options[2].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-ASC'):
          this.sortOptions.options[3].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-DESC'):
          this.sortOptions.options[4].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-ASC'):
          this.sortOptions.options[5].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-DESC'):
          this.sortOptions.options[6].setAttribute('selected', '');
          break;
      }
    }
  }

  sortByPriceAsc(): void {
    if (window.location.search.includes('sort=price-ASC')) {
      this.filters.products.sort((a, b) => a.price - b.price);
      super.updateCatalog(this.filters.products);
    }
  }

  sortByPriceDesc(): void {
    if (window.location.search.includes('sort=price-DESC')) {
      this.filters.products.sort((a, b) => b.price - a.price);
      super.updateCatalog(this.filters.products);
    }
  }

  sortByDiscountAsc(): void {
    if (window.location.search.includes('sort=discount-ASC')) {
      this.filters.products.sort((a, b) => a.discountPercentage - b.discountPercentage);
      super.updateCatalog(this.filters.products);
    }
  }

  sortByDiscountDesc(): void {
    if (window.location.search.includes('sort=discount-DESC')) {
      this.filters.products.sort((a, b) => b.discountPercentage - a.discountPercentage);
      super.updateCatalog(this.filters.products);
    }
  }

  sortByRatingAsc(): void {
    if (window.location.search.includes('sort=rating-ASC')) {
      this.filters.products.sort((a, b) => a.rating - b.rating);
      super.updateCatalog(this.filters.products);
    }
  }

  sortByRatingDesc(): void {
    if (window.location.search.includes('sort=rating-DESC')) {
      this.filters.products.sort((a, b) => b.rating - a.rating);
      super.updateCatalog(this.filters.products);
    }
  }
}

export { CardsSort };
