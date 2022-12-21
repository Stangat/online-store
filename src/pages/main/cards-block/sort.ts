import { onlineStoreData } from '../../../data/data';
import { CardsBlock } from './cards';

class CardsSort extends CardsBlock {
  sort(): void {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');

    this.sortByPriceAsc();
    this.sortByPriceDesc();
    this.sortByDiscountAsc();
    this.sortByDiscountDesc();
    this.sortByRatingAsc();
    this.sortByRatingDesc();

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        this.sortByPriceAsc();
        this.sortByPriceDesc();
        this.sortByDiscountAsc();
        this.sortByDiscountDesc();
        this.sortByRatingAsc();
        this.sortByRatingDesc();
      });
    }
  }

  setOptionSelected(numberOfOption: number): void {
    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');
    sortOptions?.options[numberOfOption].setAttribute('selected', '');
  }

  sortByPriceAsc(): void {
    if (window.location.search === '?sort=price-ASC') {
      onlineStoreData.products.sort((a, b) => a.price - b.price);
      super.updateCatalog();
      this.setOptionSelected(1);
    }
  }

  sortByPriceDesc(): void {
    if (window.location.search === '?sort=price-DESC') {
      onlineStoreData.products.sort((a, b) => b.price - a.price);
      super.updateCatalog();
      this.setOptionSelected(2);
    }
  }

  sortByDiscountAsc(): void {
    if (window.location.search === '?sort=discount-ASC') {
      onlineStoreData.products.sort((a, b) => a.discountPercentage - b.discountPercentage);
      super.updateCatalog();
      this.setOptionSelected(3);
    }
  }

  sortByDiscountDesc(): void {
    if (window.location.search === '?sort=discount-DESC') {
      onlineStoreData.products.sort((a, b) => b.discountPercentage - a.discountPercentage);
      super.updateCatalog();
      this.setOptionSelected(4);
    }
  }

  sortByRatingAsc(): void {
    if (window.location.search === '?sort=rating-ASC') {
      onlineStoreData.products.sort((a, b) => a.rating - b.rating);
      super.updateCatalog();
      this.setOptionSelected(5);
    }
  }

  sortByRatingDesc(): void {
    if (window.location.search === '?sort=rating-DESC') {
      onlineStoreData.products.sort((a, b) => b.rating - a.rating);
      super.updateCatalog();
      this.setOptionSelected(6);
    }
  }
}

export { CardsSort };
