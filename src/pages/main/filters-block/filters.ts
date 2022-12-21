import { brands, categories, pricesArray, stocksArray } from './constants';
import './filters.scss';

type TargetWithId = Event['target'] & { id?: string };

export class Filters {
  selectedFilters: Array<string> = [];
  selectedFiltersBrand: Array<string> = [];

  getNearest = (arr: number[], num: number) => {
    const arr2 = arr.map((val) => Math.abs(val - num));
    const min = Math.min(...arr2);
    const index = arr2.indexOf(min);
    return arr[index];
  };

  isTargetWithId(target: TargetWithId): asserts target is TargetWithId {
    if (target.id === undefined) {
      throw new Error('id is udefined');
    }
  }

  addIfNotExists<T>(array: T[], item: T): void {
    const index = array.indexOf(item);
    if (index === -1) {
      array.push(item);
    } else {
      array.splice(index, 1);
    }
  }

  eventHandler(target: Event['target'] | null) {
    if (!target) {
      return;
    }
    this.isTargetWithId(target);
    const category = target.id;
    this.addIfNotExists(this.selectedFilters, category);
    const checkboxItems = Array.from(document.querySelectorAll('.item'));
    const containerItem = document.querySelector('.products-container');
    checkboxItems.forEach((item) => {
      const height = containerItem?.clientHeight;
      if (item instanceof HTMLElement)
        if (this.selectedFilters.includes(item.attributes[3].value)) {
          item.style.display = 'block';
        } else if (this.selectedFilters.length === 0) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
    });
  }
  eventHandlerBrand(target: Event['target'] | null) {
    if (!target) {
      return;
    }
    this.isTargetWithId(target);
    const brand = target.id;
    this.addIfNotExists(this.selectedFiltersBrand, brand);
    const checkboxItems = Array.from(document.querySelectorAll('.item'));
    const containerItem = document.querySelector('.products-container');

    checkboxItems.forEach((item) => {
      const height = containerItem?.clientHeight;
      if (item instanceof HTMLElement)
        if (this.selectedFiltersBrand.includes(item.attributes[4].value)) {
          item.style.display = 'block';
        } else if (this.selectedFiltersBrand.length === 0) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
    });
  }

  create(): void {
    const that = this;
    const main: HTMLElement | null = document.querySelector('.main');

    const blockFilters: HTMLDivElement | null = document.createElement('div');
    blockFilters.className = 'filters-container';
    main?.appendChild(blockFilters);

    const buttonsFilter: HTMLDivElement | null = document.createElement('div');
    buttonsFilter.className = 'filters-container-buttons';
    blockFilters.appendChild(buttonsFilter);

    const resetFilters: HTMLDivElement | null = document.createElement('div');
    resetFilters.className = 'filters-container-reset';
    blockFilters.appendChild(resetFilters);
    const resetFiltersButton: HTMLButtonElement | null = document.createElement('button');
    resetFiltersButton.className = 'filters-container-reset-button';
    buttonsFilter.appendChild(resetFiltersButton);
    resetFiltersButton.innerHTML = 'Reset Filters';
    resetFiltersButton.addEventListener('click', (event) => {
      console.log(event);
    });

    const copyFilters: HTMLDivElement | null = document.createElement('div');
    copyFilters.className = 'filters-container-copy';
    blockFilters.appendChild(copyFilters);
    const copyFiltersButton: HTMLButtonElement | null = document.createElement('button');
    copyFiltersButton.className = 'filters-container-reset-button';
    buttonsFilter.appendChild(copyFiltersButton);
    copyFiltersButton.innerHTML = 'Copy!';
    copyFiltersButton.addEventListener('click', () => {
      copyFiltersButton.innerText = 'Copied';
      setTimeout(() => {
        copyFiltersButton.innerText = 'Copy!';
      }, 1000);
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          console.log('Text copied to clipboard');
        })
        .catch((err) => {
          console.error('Error in copying text: ', err);
        });
    });

    const categoryFilters: HTMLDivElement | null = document.createElement('div');
    categoryFilters.className = 'filters-container-category';
    blockFilters.appendChild(categoryFilters);
    const nameFilterCategory: HTMLElement | null = document.createElement('h3');
    nameFilterCategory.innerText = 'Category';
    categoryFilters.appendChild(nameFilterCategory);
    const listFilterCategory: HTMLDivElement | null = document.createElement('div');
    listFilterCategory.className = 'filters-container-category-list';
    categoryFilters.appendChild(listFilterCategory);

    categories.forEach((element) => {
      const containerOneCheckbox = document.createElement('div');
      containerOneCheckbox.className = 'filters-container-category-checkbox';

      const formCheckboxCategory = document.createElement('div');
      formCheckboxCategory.className = 'filters-container-category-form';

      const checkboxCategory = document.createElement('input');
      checkboxCategory.className = 'filters-container-category-input';
      checkboxCategory.type = 'checkbox';
      checkboxCategory.id = `${element}`;
      const labelCategory = document.createElement('label');
      labelCategory.className = 'filters-container-category-label';
      labelCategory.innerText = `${element}`;

      const spanCategory = document.createElement('span');
      spanCategory.className = 'filters-container-category-span';
      spanCategory.innerText = '(5/5)';
      formCheckboxCategory.appendChild(checkboxCategory);
      formCheckboxCategory.appendChild(labelCategory);
      containerOneCheckbox.appendChild(formCheckboxCategory);
      containerOneCheckbox.appendChild(spanCategory);
      listFilterCategory.appendChild(containerOneCheckbox);
      checkboxCategory.addEventListener('change', (event) => this.eventHandler(event.target));
    });

    const brandFilters: HTMLDivElement | null = document.createElement('div');
    brandFilters.className = 'filters-container-brand';
    blockFilters.appendChild(brandFilters);
    const nameFilterBrand: HTMLElement | null = document.createElement('h3');
    nameFilterBrand.innerText = 'Brand';
    brandFilters.appendChild(nameFilterBrand);
    const listFilterBrand: HTMLDivElement | null = document.createElement('div');
    listFilterBrand.className = 'filters-container-brand-list';
    brandFilters.appendChild(listFilterBrand);

    brands.forEach((element) => {
      const containerOneCheckboxBrand = document.createElement('div');
      containerOneCheckboxBrand.className = 'filters-container-brand-checkbox';

      const formCheckboxBrand = document.createElement('div');
      formCheckboxBrand.className = 'filters-container-brand-form';

      const checkboxBrand = document.createElement('input');
      checkboxBrand.className = 'filters-container-category-input';
      checkboxBrand.type = 'checkbox';
      checkboxBrand.id = `${element}`;
      const labelBrand = document.createElement('label');
      labelBrand.className = 'filters-container-category-label';
      labelBrand.innerText = `${element}`;

      const spanBrand = document.createElement('span');
      spanBrand.className = 'filters-container-category-span';
      spanBrand.innerText = '(5/5)';
      formCheckboxBrand.appendChild(checkboxBrand);
      formCheckboxBrand.appendChild(labelBrand);
      containerOneCheckboxBrand.appendChild(formCheckboxBrand);
      containerOneCheckboxBrand.appendChild(spanBrand);
      listFilterBrand.appendChild(containerOneCheckboxBrand);
      checkboxBrand.addEventListener('change', (event) => this.eventHandlerBrand(event.target));
    });

    const sliderPrice = document.createElement('div');
    sliderPrice.className = 'slider';
    blockFilters.appendChild(sliderPrice);
    const nameSliderPrice: HTMLElement | null = document.createElement('h3');
    nameSliderPrice.innerText = 'Price';
    sliderPrice.appendChild(nameSliderPrice);
    const rangeSliderPrice = document.createElement('div');
    rangeSliderPrice.className = 'range-slider price';
    sliderPrice.appendChild(rangeSliderPrice);
    const spanSliderPrice = document.createElement('span');
    spanSliderPrice.className = 'rangeValues';
    rangeSliderPrice.appendChild(spanSliderPrice);

    const inputSliderPriceMin: HTMLInputElement | null = document.createElement('input');
    inputSliderPriceMin.setAttribute('value', `${pricesArray[0]}`);
    inputSliderPriceMin.type = 'range';
    inputSliderPriceMin.value = `${pricesArray[0]}`;
    inputSliderPriceMin.min = `${pricesArray[0]}`;
    inputSliderPriceMin.max = `${pricesArray[pricesArray.length - 1]}`;
    inputSliderPriceMin.step = '1';
    rangeSliderPrice.appendChild(inputSliderPriceMin);
    const inputSliderPriceMax: HTMLInputElement | null = document.createElement('input');
    inputSliderPriceMax.setAttribute('value', `${pricesArray[pricesArray.length - 1]}`);
    inputSliderPriceMax.type = 'range';
    inputSliderPriceMax.max = `${pricesArray[pricesArray.length - 1]}`;
    inputSliderPriceMax.min = `${pricesArray[0]}`;
    inputSliderPriceMax.value = `${pricesArray[pricesArray.length - 1]}`;
    rangeSliderPrice.appendChild(inputSliderPriceMax);

    function getValsPrice() {
      let slides = rangeSliderPrice.getElementsByTagName('input');
      let slide1 = that.getNearest(pricesArray, +slides[0].value);
      let slide2 = that.getNearest(pricesArray, +slides[1].value);

      const items = document.querySelectorAll('.item');
      const itemsArray: any = Array.from(items);
      for (let i = 0; i < itemsArray.length; i++) {
        if (+itemsArray[i].attributes[1].value < slide1 || +itemsArray[i].attributes[1].value > slide2) {
          itemsArray[i].style.display = 'none';
        } else {
          itemsArray[i].style.display = 'block';
        }
      }

      // Neither slider will clip the other, so make sure we determine which is larger
      if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
      }
      let displayElement = rangeSliderPrice.getElementsByClassName('rangeValues')[0];
      displayElement.innerHTML = '€' + slide1 + ' - €' + slide2;
    }

    function price() {
      // Initialize Sliders
      let sliderSections = document.getElementsByClassName('price');
      for (let x = 0; x < sliderSections.length; x++) {
        let sliders: any = sliderSections[x].getElementsByTagName('input');
        for (let y = 0; y < sliders.length; y++) {
          if (sliders[y].type === 'range') {
            sliders[y].oninput = getValsPrice;
            sliders[y].oninput();
          }
        }
      }
    }
    getValsPrice();

    const sliderStock = document.createElement('div');
    sliderStock.className = 'slider';
    blockFilters.appendChild(sliderStock);
    const nameSliderStock: HTMLElement | null = document.createElement('h3');
    nameSliderStock.innerText = 'Stock';
    sliderStock.appendChild(nameSliderStock);
    const rangeSliderStock = document.createElement('div');
    rangeSliderStock.className = 'range-slider stock';
    sliderStock.appendChild(rangeSliderStock);
    const spanSliderStock = document.createElement('span');
    spanSliderStock.className = 'rangeValues';
    rangeSliderStock.appendChild(spanSliderStock);

    const inputSliderStockMin: HTMLInputElement | null = document.createElement('input');
    inputSliderStockMin.setAttribute('value', `${stocksArray[0]}`);
    inputSliderStockMin.type = 'range';
    inputSliderStockMin.min = `${stocksArray[0]}`;
    inputSliderStockMin.max = `${stocksArray[stocksArray.length - 1]}`;
    inputSliderStockMin.step = '1';
    rangeSliderStock.appendChild(inputSliderStockMin);
    const inputSliderStockMax: HTMLInputElement | null = document.createElement('input');
    inputSliderStockMax.type = 'range';
    inputSliderStockMax.max = `${stocksArray[stocksArray.length - 1]}`;
    inputSliderStockMax.min = `${stocksArray[0]}`;
    inputSliderStockMax.value = `${stocksArray[stocksArray.length - 1]}`;
    inputSliderStockMax.step = '1';
    rangeSliderStock.appendChild(inputSliderStockMax);

    function getValsStock() {
      let slides = rangeSliderStock.getElementsByTagName('input');
      let slide1 = that.getNearest(stocksArray, +slides[0].value);
      let slide2 = that.getNearest(stocksArray, +slides[1].value);
      // Neither slider will clip the other, so make sure we determine which is larger
      const items = document.querySelectorAll('.item');
      const itemsArray: any = Array.from(items);
      for (let i = 0; i < itemsArray.length; i++) {
        if (+itemsArray[i].attributes[2].value < slide1 || +itemsArray[i].attributes[2].value > slide2) {
          itemsArray[i].style.display = 'none';
        } else {
          itemsArray[i].style.display = 'block';
        }
      }
      if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
      }
      let displayElement = rangeSliderStock.getElementsByClassName('rangeValues')[0];
      displayElement.innerHTML = slide1 + ' - ' + slide2;
    }

    function stock() {
      // Initialize Sliders
      let sliderSections = document.getElementsByClassName('stock');
      for (let x = 0; x < sliderSections.length; x++) {
        let sliders: any = sliderSections[x].getElementsByTagName('input');
        for (let y = 0; y < sliders.length; y++) {
          if (sliders[y].type === 'range') {
            sliders[y].oninput = getValsStock;
            // Manually trigger event first time to display values
            sliders[y].oninput();
          }
        }
      }
    }
    getValsStock();

    window.addEventListener('load', function () {
      price();
      stock();
    });
  }
}
