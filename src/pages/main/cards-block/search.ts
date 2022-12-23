import { onlineStoreData } from '../../../data/data';

export class Search {
  findItems(): void {
    const itemsContainer = document.querySelector('.products-container');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const selectedData: object[] = [];
    if (itemsContainer && searchInput) {
      searchInput.addEventListener('click', () => {
        const itemTitlesArr = this.buildArrayWithItemsTitles();
        searchInput.addEventListener('search', () => {
          console.log(itemTitlesArr);
        });
      });
    }
  }

  buildArrayWithItemsTitles() {
    const itemsContainer = document.querySelector('.products-container');
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    const itemTitlesArr: string[] = [];
    if (itemsContainer && searchInput) {
      const items = itemsContainer.childNodes;
      const itemsArr = [...items] as HTMLElement[];
      const itemsWithStyleDisplayBlock: HTMLElement[] = [];
      itemsArr.forEach((item) => {
        if (window.getComputedStyle(item).display === 'block') {
          itemsWithStyleDisplayBlock.push(item);
        }
      });
      const filter = searchInput.value.toLocaleUpperCase();
      itemsWithStyleDisplayBlock?.forEach((item) => {
        const itemTitle = item.children[0].children[1].children[1].textContent;
        if (itemTitle) {
          itemTitlesArr.push(itemTitle);
        }
      });
      return itemTitlesArr;
    }
  }
}
