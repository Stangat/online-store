export class View {
  addClassList(): void {
    const items = [...document.querySelectorAll('.item')];

    items.forEach((item) => {
      item.classList.add('item_small');
      item.querySelector('.item__wrapper')?.classList.add('item__wrapper_small');
      item.querySelector('.item-rating')?.classList.add('hidden');
      item.querySelector('.item-discount__text')?.classList.add('hidden');
      item.querySelector('.item-price__text')?.classList.add('hidden');
      item.querySelector('.item-stock')?.classList.add('hidden');
      item.querySelector('.button_add')?.classList.add('button_small');
      item.querySelector('.button_details')?.classList.add('button_small');
      item.querySelector('.item-buttons-container')?.classList.add('item-buttons-container_small');
      item.querySelector('.item-image')?.classList.add('item-image_small');
      item.querySelector('.item-price')?.classList.add('item-price_small');
      const itemDiscount = item.querySelector('.item-discount__value');
      const itemTitle = item.querySelector('.item-title');
      if (itemTitle instanceof HTMLDivElement && itemDiscount instanceof HTMLSpanElement) {
        itemTitle.classList.add('item-title_small');
        itemDiscount.classList.add('item-discount__value_small');
      }
    });
  }

  removeClassList(): void {
    const items = [...document.querySelectorAll('.item')];

    items.forEach((item) => {
      item.classList.remove('item_small');
      item.querySelector('.item__wrapper')?.classList.remove('item__wrapper_small');
      item.querySelector('.item-rating')?.classList.remove('hidden');
      item.querySelector('.item-discount__text')?.classList.remove('hidden');
      item.querySelector('.item-price__text')?.classList.remove('hidden');
      item.querySelector('.item-stock')?.classList.remove('hidden');
      item.querySelector('.button_add')?.classList.remove('button_small');
      item.querySelector('.button_details')?.classList.remove('button_small');
      item.querySelector('.item-buttons-container')?.classList.remove('item-buttons-container_small');
      item.querySelector('.item-image')?.classList.remove('item-image_small');
      item.querySelector('.item-price')?.classList.remove('item-price_small');
      const itemDiscount = item.querySelector('.item-discount__value');
      const itemTitle = item.querySelector('.item-title');
      if (itemTitle instanceof HTMLDivElement && itemDiscount instanceof HTMLSpanElement) {
        itemTitle.classList.remove('item-title_small');
        itemDiscount.classList.remove('item-discount__value_small');
      }
    });
  }

  changeViewMode(): void {
    const smallViewButton = document.querySelector('.view-mode_small');
    const normalViewButton = document.querySelector('.view-mode_big');
    const items = [...document.querySelectorAll('.item')];

    if (window.location.search.includes('small=true')) {
      this.addClassList();
    }

    if (window.location.search.includes('small=false')) {
      this.removeClassList();
    }

    if (smallViewButton && items) {
      smallViewButton.addEventListener('click', () => {
        this.addClassList();
      });
    }

    if (normalViewButton && items) {
      normalViewButton.addEventListener('click', () => {
        this.removeClassList();
      });
    }
  }
}
