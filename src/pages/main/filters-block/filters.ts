import { onlineStoreData } from '../../../data/data';
import { IProductData } from '../../../interfaces/index';
import { CardsBlock } from '../cards-block/cards';
import { brands, categories, pricesArray, stocksArray } from './constants';
import './filters.scss';
import { UrlSearch } from './urlSearch';

type TargetWithId = Event['target'] & { id?: string; checked?: boolean };

export class Filters {
  constructor(
    private readonly urlSearchService: UrlSearch,
    private readonly cardBlock: CardsBlock,
    private readonly subscribers: Array<{ notify: (prod: any) => void }> = []
  ) {
    this.selectedFilters = this.urlSearchService.getAll('category')[0]?.split('&') || [];
    this.selectedFiltersBrand = this.urlSearchService.getAll('brand')[0]?.split('&') || [];
    this.priceRange = [
      +this.urlSearchService.getAll('price')[0]?.split('&')[0] || pricesArray[0],
      +this.urlSearchService.getAll('price')[0]?.split('&')[1] || pricesArray[pricesArray.length - 1],
    ];
    this.stockRange = [
      +this.urlSearchService.getAll('stock')[0]?.split('&')[0] || stocksArray[0],
      +this.urlSearchService.getAll('stock')[0]?.split('&')[1] || stocksArray[stocksArray.length - 1],
    ];
  }

  private _selectedFilters: Array<string> = [];
  private _selectedFiltersBrand: Array<string> = [];
  private _priceRange: [number, number] = [0, 0];
  private _stockRange: [number, number] = [0, 0];
  products: any[] = [];

  filterProducts(): typeof onlineStoreData.products {
    let filteredProducts: typeof onlineStoreData.products = [];
    if (this.selectedFilters.length) {
      filteredProducts = onlineStoreData.products.filter((item) => this.selectedFilters.includes(item.category));
    } else {
      filteredProducts = onlineStoreData.products;
    }
    if (this.selectedFiltersBrand.length) {
      filteredProducts = filteredProducts.filter((item) => this.selectedFiltersBrand.includes(item.brand));
    }
    filteredProducts = filteredProducts.filter(
      (item) => this.priceRange[0] <= item.price && this.priceRange[1] >= item.price
    );
    filteredProducts = filteredProducts.filter(
      (item) => this.stockRange[0] <= item.stock && this.stockRange[1] >= item.stock
    );
    this.applySort(filteredProducts);
    this.updateCategoriesCounts(filteredProducts)
    this.updateBrandsCounts(filteredProducts)

    const prices = filteredProducts.map((item: any) => item.price).sort((a, b) => a- b)
    const stocks = filteredProducts.map((item: any) => item.stock).sort((a, b) => a- b)

    this.updatePriceRange([prices[0], prices.at(-1)])
    this.updateStockRange([stocks[0], stocks.at(-1)])
    return filteredProducts;
  }

  applySort(data: IProductData[]) {
    if (window.location.search.includes('sort=price-ASC')) {
      data.sort((a, b) => a.price - b.price);
    }
    if (window.location.search.includes('sort=price-DESC')) {
      data.sort((a, b) => b.price - a.price);
    }
    if (window.location.search.includes('sort=discount-ASC')) {
      data.sort((a, b) => a.discountPercentage - b.discountPercentage);
    }
    if (window.location.search.includes('sort=discount-DESC')) {
      data.sort((a, b) => b.discountPercentage - a.discountPercentage);
    }
    if (window.location.search.includes('sort=rating-ASC')) {
      data.sort((a, b) => a.rating - b.rating);
    }
    if (window.location.search.includes('sort=rating-DESC')) {
      data.sort((a, b) => b.rating - a.rating);
    }
  }

  includeSearch(): void {
    const searchInput: HTMLInputElement | null = document.querySelector('.search-bar__input');
    if (searchInput) {
      const selectedData: IProductData[] = [];
      const searchValue = searchInput.value.toUpperCase();
      this.products.forEach((product) => {
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
      });
      this.applySort(selectedData);
      this.cardBlock.notify(selectedData);
    }
  }

  get selectedFilters() {
    return this._selectedFilters;
  }

  set selectedFilters(value: string[]) {
    this._selectedFilters = value;
    this.urlSearchService.setParam('category', value.join('&'));
    this.products = this.filterProducts();
    this.subscribers.forEach((item) => item.notify(this.products));
    if (window.location.search.includes('search')) {
      this.includeSearch();
    }
  }

  get selectedFiltersBrand() {
    return this._selectedFiltersBrand;
  }

  set selectedFiltersBrand(value: string[]) {
    this._selectedFiltersBrand = value;
    this.urlSearchService.setParam('brand', value.join('&'));
    this.products = this.filterProducts();
    this.subscribers.forEach((item) => item.notify(this.products));
    if (window.location.search.includes('search')) {
      this.includeSearch();
    }
  }

  get priceRange() {
    return this._priceRange;
  }

  set priceRange(value: [number, number]) {
    this._priceRange = value;
    this.products = this.filterProducts();
    this.subscribers.forEach((item) => item.notify(this.products));
    if (value[0] === pricesArray[0] && value[1] === pricesArray[pricesArray.length - 1]) {
      return;
    }
    this.urlSearchService.setParam('price', value.join('&'));
    if (window.location.search.includes('search')) {
      this.includeSearch();
    }
  }

  get stockRange() {
    return this._stockRange;
  }

  set stockRange(value: [number, number]) {
    this._stockRange = value;
    this.products = this.filterProducts();
    this.subscribers.forEach((item) => item.notify(this.products));
    if (value[0] === stocksArray[0] && value[1] === stocksArray[stocksArray.length - 1]) {
      return;
    }
    this.urlSearchService.setParam('stock', value.join('&'));
    if (window.location.search.includes('search')) {
      this.includeSearch();
    }
  }

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

  eventHandler(target: Event['target'] | null) {
    if (!target) {
      return;
    }
    this.isTargetWithId(target);
    const category = target.id;
    if (target.checked && category) {
      this.selectedFilters = [...this.selectedFilters, category];
    } else if (category) {
      this.selectedFilters = this.selectedFilters.filter((item) => item != category);
    }
  }
  eventHandlerBrand(target: Event['target'] | null) {
    if (!target) {
      return;
    }
    this.isTargetWithId(target);
    const brand = target.id;
    if (target.checked && brand) {
      this.selectedFiltersBrand = [...this.selectedFiltersBrand, brand];
    } else if (brand) {
      this.selectedFiltersBrand = this.selectedFiltersBrand.filter((item) => item != brand);
    }
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

  updateCategoriesCounts(filteredProd: any) {
    categories.forEach((category) => {
      const categoryNode = document.querySelectorAll(`[category=${category}].filters-container-category-span`);
      const countOfProductsInCategory = onlineStoreData.products.filter(prod => prod.category === category).length
      const curentSelectedProductInCategory = filteredProd.filter((prod: any) => prod.category === category).length
      if(categoryNode[0]) {
        categoryNode[0].innerHTML = `${curentSelectedProductInCategory}/${countOfProductsInCategory}`;
      }
    })
  }

  updateBrandsCounts(filteredProd: any) {
    brands.forEach((brand) => {
      const categoryNode = document.querySelectorAll(`[category="${brand}"].filters-container-category-span`);
      const countOfProductsInBrand = onlineStoreData.products.filter(prod => prod.brand === brand).length
      const curentSelectedProductInBrand = filteredProd.filter((prod: any) => prod.brand === brand).length
      if(categoryNode[0]) {
        categoryNode[0].innerHTML = `${curentSelectedProductInBrand}/${countOfProductsInBrand}`;
      }
    })
  }

  updatePriceRange(value: [number, number]) {
    //@ts-ignore
    const inputSliderPriceMin: HTMLInputElement | null = document.getElementById('price-min');
    //@ts-ignore
    const inputSliderPriceMax: HTMLInputElement | null = document.getElementById('price-max');
    const rangeSliderPrice = document.getElementById('rangeSliderPrice')
    const displayElement = rangeSliderPrice?.getElementsByClassName('rangeValues')[0];
    if(inputSliderPriceMin && inputSliderPriceMax && displayElement) {
      inputSliderPriceMin.value = value[0].toString()
      inputSliderPriceMax.value = value[1].toString()
      
      displayElement.innerHTML = '€' + value[0].toString() + ' - €' + value[1].toString();
    }
  }

  updateStockRange(value: [number, number]) {
    //@ts-ignore
    const inputSliderStockMin: HTMLInputElement | null = document.getElementById('stock-min');
    //@ts-ignore
    const inputSliderStockMax: HTMLInputElement | null = document.getElementById('stock-max');
    const rangeSliderStock = document.getElementById('rangeSliderStock')
    const displayElement = rangeSliderStock?.getElementsByClassName('rangeValues')[0];
    if(inputSliderStockMin && inputSliderStockMax && displayElement) {
      inputSliderStockMin.value = value[0].toString()
      inputSliderStockMax.value = value[1].toString()
      displayElement.innerHTML =value[0].toString() + ' - ' + value[1].toString();
    }
  }

  create(): void {
    const that = this;
    const main: HTMLElement | null = document.querySelector('.main');
    this.products = this.filterProducts();
    this.subscribers.forEach((item) => item.notify(this.products));
    const blockFilters: HTMLDivElement | null = document.createElement('div');
    blockFilters.className = 'filters-container';
    main?.appendChild(blockFilters);

    const buttonsFilter: HTMLDivElement | null = document.createElement('div');
    buttonsFilter.className = 'filters-container-buttons';
    blockFilters.appendChild(buttonsFilter);

    const resetFilters: HTMLDivElement | null = document.createElement('div');
    const resetFiltersButton: HTMLButtonElement | null = document.createElement('button');
    resetFiltersButton.className = 'filters-container-reset-button';
    buttonsFilter.appendChild(resetFiltersButton);
    resetFiltersButton.innerHTML = 'Reset Filters';
    resetFiltersButton.addEventListener('click', (event) => {
      window.location.search = '';
    });

    const copyFilters: HTMLDivElement | null = document.createElement('div');
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
      spanCategory.setAttribute("category", element);
      const countOfProductsInCategory = onlineStoreData.products.filter(prod => prod.category === element).length
      const curentSelectedProductInCategory = that.products.filter(prod => prod.category === element).length
      spanCategory.innerText = `${curentSelectedProductInCategory}/${countOfProductsInCategory}`;
      
      formCheckboxCategory.appendChild(checkboxCategory);
      formCheckboxCategory.appendChild(labelCategory);
      containerOneCheckbox.appendChild(formCheckboxCategory);
      containerOneCheckbox.appendChild(spanCategory);
      listFilterCategory.appendChild(containerOneCheckbox);
      checkboxCategory.addEventListener('change', (event) => this.eventHandler(event.target));
      checkboxCategory.checked = this.selectedFilters.includes(element);
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
      spanBrand.setAttribute("category", element);
      const countOfProductsInBrand = onlineStoreData.products.filter(prod => prod.brand === element).length
      const curentSelectedProductInBrand = that.products.filter(prod => prod.brand === element).length
      spanBrand.innerText = `${curentSelectedProductInBrand}/${countOfProductsInBrand}`;
      formCheckboxBrand.appendChild(checkboxBrand);
      formCheckboxBrand.appendChild(labelBrand);
      containerOneCheckboxBrand.appendChild(formCheckboxBrand);
      containerOneCheckboxBrand.appendChild(spanBrand);
      listFilterBrand.appendChild(containerOneCheckboxBrand);
      checkboxBrand.addEventListener('change', (event) => this.eventHandlerBrand(event.target));
      checkboxBrand.checked = this.selectedFiltersBrand.includes(element);
    });

    const sliderPrice = document.createElement('div');
    sliderPrice.className = 'slider';
    blockFilters.appendChild(sliderPrice);
    const nameSliderPrice: HTMLElement | null = document.createElement('h3');
    nameSliderPrice.innerText = 'Price';
    sliderPrice.appendChild(nameSliderPrice);
    const rangeSliderPrice = document.createElement('div');
    rangeSliderPrice.className = 'range-slider price';
    rangeSliderPrice.id = 'rangeSliderPrice'
    sliderPrice.appendChild(rangeSliderPrice);
    const spanSliderPrice = document.createElement('span');
    spanSliderPrice.className = 'rangeValues';
    rangeSliderPrice.appendChild(spanSliderPrice);

    const inputSliderPriceMin: HTMLInputElement | null = document.createElement('input');
    inputSliderPriceMin.type = 'range';
    inputSliderPriceMin.id = 'price-min'
    inputSliderPriceMin.min = `${pricesArray[0]}`;
    inputSliderPriceMin.max = `${pricesArray[pricesArray.length - 1]}`;
    // inputSliderPriceMin.setAttribute('value', `${that.priceRange[0]}`);
    inputSliderPriceMin.value = `${that.priceRange[0]}`;
    // inputSliderPriceMin.step = '1';
    rangeSliderPrice.appendChild(inputSliderPriceMin);

    const inputSliderPriceMax: HTMLInputElement | null = document.createElement('input');
    inputSliderPriceMax.id = 'price-max'
    inputSliderPriceMax.setAttribute('value', `${that.priceRange[1]}`);
    inputSliderPriceMax.type = 'range';
    inputSliderPriceMax.max = `${pricesArray[pricesArray.length - 1]}`;
    inputSliderPriceMax.min = `${pricesArray[0]}`;
    inputSliderPriceMax.value = `${that.priceRange[1]}`;
    rangeSliderPrice.appendChild(inputSliderPriceMax);
    function getValsPrice() {
      let slides = rangeSliderPrice.getElementsByTagName('input');

      that.priceRange = [
        that.getNearest(pricesArray, +slides[0].value),
        that.getNearest(pricesArray, +slides[1].value),
      ];

      // Neither slider will clip the other, so make sure we determine which is larger
      /* if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
      } */
      let displayElement = rangeSliderPrice.getElementsByClassName('rangeValues')[0];
      displayElement.innerHTML = '€' + that.priceRange[0] + ' - €' + that.priceRange[1];
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
    rangeSliderStock.id = 'rangeSliderStock'
    sliderStock.appendChild(rangeSliderStock);
    const spanSliderStock = document.createElement('span');
    spanSliderStock.className = 'rangeValues';
    rangeSliderStock.appendChild(spanSliderStock);

    const inputSliderStockMin: HTMLInputElement | null = document.createElement('input');
    inputSliderStockMin.type = 'range';
    inputSliderStockMin.id = 'stock-min'
    inputSliderStockMin.min = `${stocksArray[0]}`;
    inputSliderStockMin.max = `${stocksArray[stocksArray.length - 1]}`;
    inputSliderStockMin.setAttribute('value', `${that.stockRange[0]}`);
    inputSliderStockMin.step = '1';
    rangeSliderStock.appendChild(inputSliderStockMin);
    const inputSliderStockMax: HTMLInputElement | null = document.createElement('input');
    inputSliderStockMax.type = 'range';
    inputSliderStockMax.id = 'stock-max'
    inputSliderStockMax.max = `${stocksArray[stocksArray.length - 1]}`;
    inputSliderStockMax.min = `${stocksArray[0]}`;
    inputSliderStockMax.value = `${that.stockRange[1]}`;
    // inputSliderStockMax.step = '1';
    rangeSliderStock.appendChild(inputSliderStockMax);

    function getValsStock() {
      let slides = rangeSliderStock.getElementsByTagName('input');
      that.stockRange = [
        that.getNearest(stocksArray, +slides[0].value),
        that.getNearest(stocksArray, +slides[1].value),
      ];

      /* if (slide1 > slide2) {
        let tmp = slide2;
        slide2 = slide1;
        slide1 = tmp;
      } */
      let displayElement = rangeSliderStock.getElementsByClassName('rangeValues')[0];
      displayElement.innerHTML = that.stockRange[0] + ' - ' + that.stockRange[1];
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

    // window.addEventListener('load', function () {
    price();
    stock();
    // });
  }
}
