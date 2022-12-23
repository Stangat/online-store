import { Filters } from '../filters-block/filters';
import { CardsBlock } from './cards';

class CardsSort extends CardsBlock {
  constructor(filters: Filters) {
    super()
    this.filters = filters
  }
  filters: Filters
  sort(): void {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');

    this.sortByPriceAsc();
    this.sortByPriceDesc();
    this.sortByRatingAsc();
    this.sortByRatingDesc();
    this.sortByDiscountAsc();
    this.sortByDiscountDesc();
    this.handleSelectedAttribute();

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
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
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');
    if (sortOptions) {
      switch (true) {
        case window.location.search.includes('sort=price-ASC'):
          sortOptions.options[1].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=price-DESC'):
          sortOptions.options[2].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-ASC'):
          sortOptions.options[3].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=rating-DESC'):
          sortOptions.options[4].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-ASC'):
          sortOptions.options[5].setAttribute('selected', '');
          break;
        case window.location.search.includes('sort=discount-DESC'):
          sortOptions.options[6].setAttribute('selected', '');
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
