import { onlineStoreData } from '../../../../data/data';
import { CardsId } from './cardsIdEnum';
import './cards.scss';

class Card {
  createCatalog(): void {
    const products = document.createElement('div');
    products.className = 'products-container';
    const main = document.querySelector('.main');
    const NUMBER_OF_CARDS = 100;
    const NUMBER_OF_CHARACTERS_IN_TITLE = 26;
    if (main) {
      main.append(products);
    }

    for (let i = 0; i < NUMBER_OF_CARDS; i++) {
      const item = document.createElement('div');
      item.className = 'item';
      products.append(item);

      const itemWrapper = document.createElement('div');
      itemWrapper.className = 'item__wrapper';
      item.append(itemWrapper);

      const itemImage = document.createElement('div');
      itemImage.className = 'item-image';
      itemWrapper.append(itemImage);
      itemImage.style.backgroundImage = `url(${onlineStoreData.products[i].thumbnail})`;

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
      ratingValue.textContent = `${onlineStoreData.products[i].rating}`;
      itemRatingParagraph.append(ratingValue);

      const itemTitle = document.createElement('div');
      itemTitle.className = 'item-title';
      itemDetailsContainer.append(itemTitle);
      itemTitle.textContent = `${onlineStoreData.products[i].title}`;

      if (
        itemTitle.textContent.length <= NUMBER_OF_CHARACTERS_IN_TITLE &&
        onlineStoreData.products[i].id !== CardsId.id13 &&
        onlineStoreData.products[i].id !== CardsId.id23 &&
        onlineStoreData.products[i].id !== CardsId.id28 &&
        onlineStoreData.products[i].id !== CardsId.id63
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
      priceValue.textContent = `${onlineStoreData.products[i].price} €`;
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
      discountValue.textContent = `${onlineStoreData.products[i].discountPercentage} %`;
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
      stockValue.textContent = `${onlineStoreData.products[i].stock}`;
      itemStockParagraph.append(stockValue);

      const itemButtons = document.createElement('div');
      itemButtons.className = 'item-buttons-container';
      itemWrapper.append(itemButtons);
      const addToCartButton = document.createElement('button');
      addToCartButton.className = 'button button_add';
      addToCartButton.textContent = 'Add to cart';
      itemButtons.append(addToCartButton);
      const detailsButton = document.createElement('button');
      detailsButton.className = 'button button_details';
      detailsButton.textContent = 'Details';
      itemButtons.append(detailsButton);
    }
  }
}

export { Card };