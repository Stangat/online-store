import { CardsId } from './cardsIdEnum';
import './styles/cards.scss';
import './styles/sort-panel.scss';
import { onlineStoreData as onlineStoreDataMock } from '../../../data/data';

class CardsBlock {
  constructor() {}

  notify(products: typeof onlineStoreDataMock.products) {
    //console.log(products);
    this.updateCatalog(products);
    this.productsCount = +products.length;
    this.updateFounded(+products.length);
  }

  productsCount: number = 0;
  updateFounded(count: number) {
    const stats = document.querySelector('.stats');
    if (stats) {
      stats.innerHTML = `Found: ${count}`;
    }
       if (count === 0) {
      const productsContainer: HTMLDivElement | null = document.querySelector('.products-container');
      if (productsContainer) {
        productsContainer.innerHTML = 'Unfortunately, no such products were found, try again.';
        productsContainer.style.padding = '20%'
        productsContainer.style.margin = '5%'
        productsContainer.style.color = '#dc092e'
        productsContainer.style.fontSize = '25px'
        productsContainer.style.fontWeight = '600'
      }
    } 
  }

  createSortPanel(): void {
    const products: HTMLDivElement | null = document.querySelector('.products');
    const productsContainer: HTMLDivElement | null = document.querySelector('.products-container');
    const sortPanel = document.createElement('div');
    sortPanel.className = 'sort-panel';
    products?.prepend(sortPanel);

    const sortOptions = document.createElement('select');
    sortOptions.className = 'selector';
    sortPanel.append(sortOptions);

    const defaultOption = document.createElement('option');
    defaultOption.className = 'selector__option selector__option_default';
    sortOptions.append(defaultOption);
    defaultOption.value = 'sort-title';
    defaultOption.setAttribute('disabled', '');
    defaultOption.textContent = 'Sort options:';

    const optionOne = document.createElement('option');
    optionOne.className = 'selector__option';
    sortOptions.append(optionOne);
    optionOne.value = 'price-ASC';
    optionOne.textContent = 'sort by price (asc)';

    const optionTwo = document.createElement('option');
    optionTwo.className = 'selector__option';
    sortOptions.append(optionTwo);
    optionTwo.value = 'price-DESC';
    optionTwo.textContent = 'sort by price (desc)';

    const optionThree = document.createElement('option');
    optionThree.className = 'selector__option';
    sortOptions.append(optionThree);
    optionThree.value = 'rating-ASC';
    optionThree.textContent = 'sort by rating (asc)';

    const optionFour = document.createElement('option');
    optionFour.className = 'selector__option';
    sortOptions.append(optionFour);
    optionFour.value = 'rating-DESC';
    optionFour.textContent = 'sort by rating (desc)';

    const optionFive = document.createElement('option');
    optionFive.className = 'selector__option';
    sortOptions.append(optionFive);
    optionFive.value = 'discount-ASC';
    optionFive.textContent = 'sort by discount (asc)';

    const optionSix = document.createElement('option');
    optionSix.className = 'selector__option';
    sortOptions.append(optionSix);
    optionSix.value = 'discount-DESC';
    optionSix.textContent = 'sort by discount (desc)';

    const stats = document.createElement('div');
    stats.className = 'stats';
    stats.textContent = `Found: ${this.productsCount}`;
    sortPanel.append(stats);

    const searchBar = document.createElement('div');
    searchBar.className = 'search-bar';
    sortPanel.append(searchBar);
    const searchInput = document.createElement('input');
    searchInput.className = 'search-bar__input';
    searchInput.type = 'text';
    searchInput.placeholder = 'Search product';
    searchBar.append(searchInput);

    const viewMode = document.createElement('div');
    viewMode.className = 'view-mode';
    sortPanel.append(viewMode);

    const smallView = document.createElement('span');
    smallView.className = 'material-icons view-mode_small';
    smallView.textContent = 'view_comfy';
    viewMode.append(smallView);

    const bigView = document.createElement('span');
    bigView.className = 'material-icons view-mode_big';
    bigView.textContent = 'view_module';
    viewMode.append(bigView);
  }

  createCatalog(productsDate: typeof onlineStoreDataMock.products): void {
    const products = document.createElement('div');
    products.className = 'products';
    const main = document.querySelector('.main');
    if (main) {
      main.append(products);
    }
    this.updateCatalog(productsDate);
  }

  updateCatalog(productsDate: typeof onlineStoreDataMock.products): void {
    this.clearCatalog();
    const NUMBER_OF_CHARACTERS_IN_TITLE = 26;
    const products = document.querySelector('.products');
    const productsContainer = document.createElement('div');
    productsContainer.className = 'products-container';
    products?.append(productsContainer);
    //console.log(productsDate);

    for (let i = 0; i < productsDate.length; i += 1) {
      const item = document.createElement('div');
      item.className = 'item';
      productsDate[i].id;
      item.setAttribute('data-price', `${productsDate[i].price}`);
      item.setAttribute('data-stock', `${productsDate[i].stock}`);
      item.setAttribute('data-category', `${productsDate[i].category}`);
      item.setAttribute('data-brand', `${productsDate[i].brand}`);
      productsContainer.append(item);

      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item__wrapper';
      item.append(itemWrapper);

      const itemImage = document.createElement('div');
      itemImage.className = 'item-image';
      itemWrapper.append(itemImage);
      itemImage.style.backgroundImage = `url(${productsDate[i].thumbnail})`;

      const itemDetailsContainer = document.createElement('div');
      itemDetailsContainer.className = 'item-details-container';
      itemWrapper.append(itemDetailsContainer);

      const itemRating = document.createElement('div');
      itemRating.className = 'item-rating';
      itemDetailsContainer.append(itemRating);
      const itemRatingParagraph = document.createElement('p');
      itemRatingParagraph.className = 'item__details item-rating__details';
      itemRating.append(itemRatingParagraph);
      const ratingText = document.createElement('span');
      ratingText.className = 'material-icons item-rating__text';
      ratingText.textContent = 'star';
      itemRatingParagraph.append(ratingText);
      const ratingValue = document.createElement('span');
      ratingValue.className = 'item-rating__value';
      ratingValue.textContent = `${productsDate[i].rating}`;
      itemRatingParagraph.append(ratingValue);

      const itemTitle = document.createElement('div');
      itemTitle.className = 'item-title';
      itemDetailsContainer.append(itemTitle);
      itemTitle.textContent = `${productsDate[i].title}`;

      if (
        itemTitle.textContent.length <= NUMBER_OF_CHARACTERS_IN_TITLE &&
        productsDate[i].id !== CardsId.id13 &&
        productsDate[i].id !== CardsId.id23 &&
        productsDate[i].id !== CardsId.id28 &&
        productsDate[i].id !== CardsId.id63
      ) {
        itemTitle.style.marginBottom = '25px';
      }

      const itemPrice = document.createElement('div');
      itemPrice.className = 'item-price';
      itemDetailsContainer.append(itemPrice);
      const itemPriceParagraph = document.createElement('p');
      itemPriceParagraph.className = 'item__details item-price__details';
      itemPrice.append(itemPriceParagraph);
      const priceText = document.createElement('span');
      priceText.className = 'item-price__text';
      priceText.textContent = 'Price:';
      itemPriceParagraph.append(priceText);
      const priceValue = document.createElement('span');
      priceValue.className = 'item-price__value';
      priceValue.textContent = `${productsDate[i].price} €`;
      itemPriceParagraph.append(priceValue);

      const itemDiscount = document.createElement('div');
      itemDiscount.className = 'item-discount';
      itemDetailsContainer.append(itemDiscount);
      const itemDiscountParagraph = document.createElement('p');
      itemDiscountParagraph.className = 'item__details item-discount__details';
      itemDiscount.append(itemDiscountParagraph);
      const discountText = document.createElement('span');
      discountText.className = 'item-discount__text';
      discountText.textContent = 'Discount:';
      itemDiscountParagraph.append(discountText);
      const discountValue = document.createElement('span');
      discountValue.className = 'item-discount__value';
      discountValue.textContent = `${productsDate[i].discountPercentage} %`;
      itemDiscountParagraph.append(discountValue);

      const itemStock = document.createElement('div');
      itemStock.className = 'item-stock';
      itemDetailsContainer.append(itemStock);
      const itemStockParagraph = document.createElement('p');
      itemStockParagraph.className = 'item__details item-stock__details';
      itemStock.append(itemStockParagraph);
      const stockText = document.createElement('span');
      stockText.className = 'item-stock__text';
      stockText.textContent = 'Stock:';
      itemStockParagraph.append(stockText);
      const stockValue = document.createElement('span');
      stockValue.className = 'item-stock__value';
      stockValue.textContent = `${productsDate[i].stock}`;
      itemStockParagraph.append(stockValue);

      const itemButtons = document.createElement('div');
      itemButtons.className = 'item-buttons-container';
      itemWrapper.append(itemButtons);
      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'button button_add';

      const storageProduct = localStorage.getItem('product-cart');
      let productStorage = (storageProduct && JSON.parse(storageProduct)) || [];
      const isProductInCart = productStorage.find((prod: any) => prod.id === productsDate[i].id);
      addToCartButton.textContent = isProductInCart ? 'Drop from cart' : 'Add to cart';

      itemButtons.append(addToCartButton);
      const detailsButton = document.createElement('button');
      detailsButton.className = 'button button_details';
      detailsButton.textContent = 'Details';

      itemButtons.append(detailsButton);

      detailsButton.addEventListener('click', (event) => {
        const itemId = productsDate[i].id;
        window.location.href = '/product/' + `${itemId}`;
      });

      addToCartButton?.addEventListener('click', (event) => {
        const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
        const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');
        let product = productsDate[i];
        if (headerPrice) {
          if (localStorage.getItem('product-cart') && JSON.parse(localStorage.getItem('product-cart') || '')?.length) {
            let productStorage = JSON.parse(localStorage.getItem('product-cart') as string);
            const isProductExist = productStorage.find((prod: any) => prod.id === product.id);
            if (isProductExist) {
              productStorage = productStorage.filter((item: any) => item.id !== product.id);
              addToCartButton.innerText = 'Add to cart';
            } else {
              productStorage.push(product);
              addToCartButton.innerText = 'Drop from cart';
            }
            localStorage.setItem('product-cart', `${JSON.stringify(productStorage)}`);
            const result = productStorage.reduce((a: any, b: any) => a + b.price, 0);
            localStorage.setItem('result', `${result}`);
            headerPrice.innerText = `Total Price: ${result}€`;
          } else {
            localStorage.setItem('product-cart', `${JSON.stringify([product])}`);
            headerPrice.innerText = `Total Price: ${product.price}€`;
            addToCartButton.innerText = 'Drop from cart';
          }
        }
        if (headerCount) {
          const productStorage = JSON.parse(localStorage.getItem('product-cart') as string);
          localStorage.getItem('product-cart');
          localStorage.setItem('storage-length', `${productStorage.length}`);
          headerCount.innerText = `${productStorage.length}`;
        }
      });
    }
  }

  clearCatalog(): void {
    const products: HTMLDivElement | null = document.querySelector('.products-container');
    products?.remove();
  }
}

export { CardsBlock };
