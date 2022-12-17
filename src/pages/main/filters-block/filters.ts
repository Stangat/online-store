import { onlineStoreData } from '../../../data/data';
import './filters.scss';

const categories = new Set(onlineStoreData.products.map((product) => product.category));
const brands = new Set(onlineStoreData.products.map((product) => product.brand));

export class Filters {
  create(): void {
    const main: HTMLElement | null = document.querySelector('.main');

    const blockFilters: HTMLDivElement | null = document.createElement('div');
    blockFilters.className = 'filters-container';
    main?.appendChild(blockFilters);

    const resetFilters: HTMLDivElement | null = document.createElement('div');
    resetFilters.className = 'filters-container-reset';
    blockFilters.appendChild(resetFilters);
    const resetFiltersButton: HTMLButtonElement | null = document.createElement('button');
    resetFiltersButton.className = 'filters-container-reset-button';
    resetFilters.appendChild(resetFiltersButton);
    resetFiltersButton.innerHTML = 'Reset Filters';
    resetFiltersButton.addEventListener('click', (event) => {
      console.log(event);
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
    });

    const priceFilters: HTMLDivElement | null = document.createElement('div');
    priceFilters.className = 'filters-container-price';
    blockFilters.appendChild(priceFilters);
    const nameFilterPrice: HTMLElement | null = document.createElement('h3');
    nameFilterPrice.innerText = 'Price';
    priceFilters.appendChild(nameFilterPrice);

    const stockFilters: HTMLDivElement | null = document.createElement('div');
    stockFilters.className = 'filters-container-stock';
    blockFilters.appendChild(stockFilters);
    const nameFilterStock: HTMLElement | null = document.createElement('h3');
    nameFilterStock.innerText = 'Stock';
    stockFilters.appendChild(nameFilterStock);
  }
}
