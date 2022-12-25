import { onlineStoreData } from '../../../data/data';
import { IProductData } from '../../../interfaces/index';
import { CardsBlock } from './cards';

export class Search extends CardsBlock {
  buildArrayWithItemsTitles(): string[] | undefined {
    const itemsContainer = document.querySelector('.products-container');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const itemTitlesArr: string[] = [];

    if (itemsContainer && searchInput) {
      const items = itemsContainer.childNodes;
      const itemsArr = [...items] as HTMLElement[];
      itemsArr?.forEach((item) => {
        const itemTitle = item.children[0].children[1].children[1].textContent;
        if (itemTitle) {
          itemTitlesArr.push(itemTitle);
        }
      });
      return itemTitlesArr;
    }
  }

  findItems(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const itemsContainer = document.querySelector('.products-container');

    if (itemsContainer && searchInput) {
      searchInput.addEventListener('focus', () => {
        if (!searchInput.value) {
          const itemTitlesArr = this.buildArrayWithItemsTitles();
          searchInput.addEventListener('keyup', () => {
            const selectedData: IProductData[] = [];
            const searchValue = searchInput.value.toUpperCase();
            onlineStoreData.products.forEach((product) => {
              if (itemTitlesArr?.includes(product.title)) {
                const title = product.title;
                const description = product.description;
                const price = product.price.toString();
                const discount = product.discountPercentage.toString();
                const rating = product.rating.toString();
                const stock = product.stock.toString();
                const brand = product.brand;
                const category = product.category;
                if (
                  title.toUpperCase().indexOf(searchValue) > -1 ||
                  description.toUpperCase().indexOf(searchValue) > -1 ||
                  price.toUpperCase().indexOf(searchValue) > -1 ||
                  discount.toUpperCase().indexOf(searchValue) > -1 ||
                  rating.toUpperCase().indexOf(searchValue) > -1 ||
                  stock.toUpperCase().indexOf(searchValue) > -1 ||
                  brand.toUpperCase().indexOf(searchValue) > -1 ||
                  category.toUpperCase().indexOf(searchValue) > -1
                ) {
                  selectedData.push(product);
                }
              }
            });
            super.notify(selectedData);
          });
        }
      });
    }
  }
}
