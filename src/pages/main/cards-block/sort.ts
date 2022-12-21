import { onlineStoreData } from '../../../data/data';
import { CardsBlock } from './cards';

class CardsSort extends CardsBlock {
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
        case window.location.search === '?sort=price-ASC':
          sortOptions.options[1].setAttribute('selected', '');
          break;
        case window.location.search === '?sort=price-DESC':
          sortOptions.options[2].setAttribute('selected', '');
          break;
        case window.location.search === '?sort=rating-ASC':
          sortOptions.options[3].setAttribute('selected', '');
          break;
        case window.location.search === '?sort=rating-DESC':
          sortOptions.options[4].setAttribute('selected', '');
          break;
        case window.location.search === '?sort=discount-ASC':
          sortOptions.options[5].setAttribute('selected', '');
          break;
        case window.location.search === '?sort=discount-DESC':
          sortOptions.options[6].setAttribute('selected', '');
          break;
      }
    }
  }

  sortByPriceAsc(): void {
    if (window.location.search === '?sort=price-ASC') {
      onlineStoreData.products.sort((a, b) => a.price - b.price);
      super.updateCatalog();
    }
  }

  sortByPriceDesc(): void {
    if (window.location.search === '?sort=price-DESC') {
      onlineStoreData.products.sort((a, b) => b.price - a.price);
      super.updateCatalog();
    }
  }

  sortByDiscountAsc(): void {
    if (window.location.search === '?sort=discount-ASC') {
      onlineStoreData.products.sort((a, b) => a.discountPercentage - b.discountPercentage);
      super.updateCatalog();
    }
  }

  sortByDiscountDesc(): void {
    if (window.location.search === '?sort=discount-DESC') {
      onlineStoreData.products.sort((a, b) => b.discountPercentage - a.discountPercentage);
      super.updateCatalog();
    }
  }

  sortByRatingAsc(): void {
    if (window.location.search === '?sort=rating-ASC') {
      onlineStoreData.products.sort((a, b) => a.rating - b.rating);
      super.updateCatalog();
    }
  }

  sortByRatingDesc(): void {
    if (window.location.search === '?sort=rating-DESC') {
      onlineStoreData.products.sort((a, b) => b.rating - a.rating);
      super.updateCatalog();
    }
  }
}

export { CardsSort };
