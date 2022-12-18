import { onlineStoreData } from '../../../data/data';
import { CardsBlock } from './cards';

class CardsSort extends CardsBlock {
  sort() {
    if (window.location.search === '?sort=price-ASC') {
      onlineStoreData.products.sort((a, b) => a.price - b.price);
      super.clearCatalog();
      super.createCatalog();
    }

    const sortOptions: HTMLSelectElement | null = document.querySelector('.selector');

    if (sortOptions) {
      sortOptions.addEventListener('change', (): void => {
        if (window.location.search === '?sort=price-ASC') {
          onlineStoreData.products.sort((a, b) => a.price - b.price);
          super.clearCatalog();
          super.createCatalog();
        }
      });
    }
  }
}

export { CardsSort };
