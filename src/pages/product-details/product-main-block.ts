import { onlineStoreData } from '../../data/data';
import { IProductData } from '../../interfaces/index';
import './product.scss';

export class ProductMain {
  create(id: number): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const item = onlineStoreData.products.find((item) => item.id === id);
    const productsBlock: HTMLDivElement | null = document.createElement('div');
    productsBlock.className = 'product-details';
    main?.appendChild(productsBlock);
    const linkNavigation: HTMLDivElement | null = document.createElement('div');
    linkNavigation.className = 'link-paths';
    productsBlock.appendChild(linkNavigation);
    const linkMain: HTMLAnchorElement | null = document.createElement('a');
    linkMain.className = 'link-paths-main';
    linkMain.href = '/';
    linkMain.innerText = 'STORE';
    linkNavigation.appendChild(linkMain);
    const separatorLink: HTMLDivElement | null = document.createElement('div');
    separatorLink.innerText = ' >> ';
    linkNavigation.appendChild(separatorLink);
    const linkCategory: HTMLAnchorElement | null = document.createElement('a');
    linkCategory.className = 'link-paths-category';
    linkCategory.innerText = `${item?.category}`;
    linkNavigation.appendChild(linkCategory);
    const separatorLinkTwo: HTMLDivElement | null = document.createElement('div');
    separatorLinkTwo.innerText = ' >> ';
    linkNavigation.appendChild(separatorLinkTwo);
    const linkBrand: HTMLAnchorElement | null = document.createElement('a');
    linkBrand.className = 'link-paths-brand';
    linkBrand.innerText = `${item?.brand}`;
    linkNavigation.appendChild(linkBrand);
    const separatorLinkThree: HTMLDivElement | null = document.createElement('div');
    separatorLinkThree.innerText = ' >> ';
    linkNavigation.appendChild(separatorLinkThree);
    const linkTitle: HTMLAnchorElement | null = document.createElement('a');
    linkTitle.className = 'link-paths-title';
    linkTitle.innerText = `${item?.title}`;
    linkNavigation.appendChild(linkTitle);

    const productDetail: HTMLDivElement | null = document.createElement('div');
    productDetail.className = 'product-detail';
    productsBlock.appendChild(productDetail);
    const productTitle: HTMLDivElement | null = document.createElement('div');
    productTitle.className = 'product-title';
    productTitle.innerText = `${item?.title}`;
    productDetail.appendChild(productTitle);
    const productData: HTMLDivElement | null = document.createElement('div');
    productData.className = 'product-data';
    productDetail.appendChild(productData);

    const productPhotos: HTMLDivElement | null = document.createElement('div');
    productPhotos.className = 'product-photos';
    item?.images.forEach((image) => {
      const img: HTMLImageElement | null = document.createElement('img');
      img.src = `${image}`;
      productPhotos.appendChild(img);
    });

    const firstImage = productPhotos.firstChild;
    if (firstImage instanceof HTMLImageElement) firstImage.className = 'block';
    productData.appendChild(productPhotos);
    const button: HTMLButtonElement | null = document.createElement('button');
    button.className = 'btnRight';
    button.innerText = 'NEXT';
    productPhotos.appendChild(button);
    let slides = document.querySelectorAll('.product-photos img');

    let indexSlide: number = 0;

    button.addEventListener('click', function () {
      ++indexSlide;
      if (indexSlide >= slides.length) {
        slides[indexSlide - 1].classList.remove('block');
        indexSlide = 0;
        slides[indexSlide].classList.add('block');
      } else {
        slides[indexSlide - 1].classList.remove('block');
        slides[indexSlide].classList.add('block');
      }
    });

    const productInfo: HTMLDivElement | null = document.createElement('div');
    productInfo.className = 'product-info';
    productData.appendChild(productInfo);

    const productDescription: HTMLDivElement | null = document.createElement('div');
    productDescription.className = 'product-detail-item';
    productInfo.appendChild(productDescription);
    const productDescriptionTitle: HTMLElement | null = document.createElement('h3');
    productDescriptionTitle.className = 'product-item-title';
    productDescriptionTitle.innerText = 'Description';
    productDescription.appendChild(productDescriptionTitle);
    const productDescriptionText: HTMLElement | null = document.createElement('p');
    productDescriptionText.className = 'product-item-text';
    productDescriptionText.innerText = `${item?.description}`;
    productDescription.appendChild(productDescriptionText);

    const productDiscount: HTMLDivElement | null = document.createElement('div');
    productDiscount.className = 'product-detail-item';
    productInfo.appendChild(productDiscount);
    const productDiscountTitle: HTMLElement | null = document.createElement('h3');
    productDiscountTitle.className = 'product-item-title';
    productDiscountTitle.innerText = 'Discount Percentage';
    productDiscount.appendChild(productDiscountTitle);
    const productDiscountText: HTMLElement | null = document.createElement('p');
    productDiscountText.className = 'product-item-text';
    productDiscountText.innerText = `${item?.discountPercentage}`;
    productDiscount.appendChild(productDiscountText);

    const productRaiting: HTMLDivElement | null = document.createElement('div');
    productRaiting.className = 'product-detail-item';
    productInfo.appendChild(productRaiting);
    const productRaitingTitle: HTMLElement | null = document.createElement('h3');
    productRaitingTitle.className = 'product-item-title';
    productRaitingTitle.innerText = 'Raiting';
    productRaiting.appendChild(productRaitingTitle);
    const productRaitingText: HTMLElement | null = document.createElement('p');
    productRaitingText.className = 'product-item-text';
    productRaitingText.innerText = `${item?.rating}`;
    productRaiting.appendChild(productRaitingText);

    const productStock: HTMLDivElement | null = document.createElement('div');
    productStock.className = 'product-detail-item';
    productInfo.appendChild(productStock);
    const productStockTitle: HTMLElement | null = document.createElement('h3');
    productStockTitle.className = 'product-item-title';
    productStockTitle.innerText = 'Stock';
    productStock.appendChild(productStockTitle);
    const productStockText: HTMLElement | null = document.createElement('p');
    productStockText.className = 'product-item-text';
    productStockText.innerText = `${item?.stock}`;
    productStock.appendChild(productStockText);

    const productBrand: HTMLElement | null = document.createElement('div');
    productBrand.className = 'product-detail-item';
    productInfo.appendChild(productBrand);
    const productBrandTitle: HTMLElement | null = document.createElement('h3');
    productBrandTitle.className = 'product-item-title';
    productBrandTitle.innerText = 'Brand';
    productBrand.appendChild(productBrandTitle);
    const productBrandText: HTMLElement | null = document.createElement('p');
    productBrandText.className = 'product-item-text';
    productBrandText.innerText = `${item?.brand}`;
    productBrand.appendChild(productBrandText);

    const productCategory: HTMLDivElement | null = document.createElement('div');
    productCategory.className = 'product-detail-item';
    productInfo.appendChild(productCategory);
    const productCategoryTitle: HTMLElement | null = document.createElement('h3');
    productCategoryTitle.className = 'product-item-title';
    productCategoryTitle.innerText = 'Category';
    productCategory.appendChild(productCategoryTitle);
    const productCategoryText: HTMLElement | null = document.createElement('p');
    productCategoryText.className = 'product-item-text';
    productCategoryText.innerText = `${item?.category}`;
    productCategory.appendChild(productCategoryText);

    const addBlock: HTMLDivElement | null = document.createElement('div');
    addBlock.className = 'add-block';
    productData.appendChild(addBlock);
    const cartButton: HTMLDivElement | null = document.createElement('div');
    cartButton.className = 'cart-button';
    cartButton.innerText = `€ ${item?.price}`;
    addBlock.appendChild(cartButton);
    const buttonAddRemove: HTMLButtonElement | null = document.createElement('button');
    buttonAddRemove.className = 'btn-add';
    buttonAddRemove.innerText = 'ADD TO CART';

    const storageProduct = localStorage.getItem('product-cart');
    let productStorage = (storageProduct && JSON.parse(storageProduct)) || [];
    const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
    const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');
    const isProductInCart = productStorage.find((prod: IProductData) => prod.id === item?.id);
    buttonAddRemove.textContent = isProductInCart ? 'Drop from cart' : 'Add to cart';
    buttonAddRemove?.addEventListener('click', () => {
      let product = item;
      if (headerPrice) {
        if (localStorage.getItem('product-cart') && JSON.parse(localStorage.getItem('product-cart') || '')?.length) {
          let productStorage: IProductData[] = JSON.parse(localStorage.getItem('product-cart') || '[]');
          const isProductExist = productStorage.find((prod: IProductData) => {
            return prod.id === product?.id;
          });
          if (isProductExist) {
            productStorage = productStorage.filter((item: IProductData) => item.id !== product?.id);
            buttonAddRemove.innerText = 'Add to cart';
          } else {
            if (product !== undefined) productStorage.push(product);
            buttonAddRemove.innerText = 'Drop from cart';
          }
          localStorage.setItem('product-cart', `${JSON.stringify(productStorage)}`);
          const result = productStorage.reduce((acc: number, prod: IProductData) => acc + prod.price, 0);
          localStorage.setItem('result', `${result}`);
          headerPrice.innerText = `Total Price: ${result}€`;
        } else {
          localStorage.setItem('product-cart', `${JSON.stringify([product])}`);
          localStorage.setItem('result', `${product?.price}`);
          headerPrice.innerText = `Total Price: ${product?.price}€`;
          buttonAddRemove.innerText = 'Drop from cart';
        }
      }
      if (headerCount) {
        const productStorage: IProductData[] = JSON.parse(localStorage.getItem('product-cart') || '[]');
        localStorage.getItem('product-cart');
        localStorage.setItem('storage-length', `${productStorage.length}`);
        headerCount.innerText = `${productStorage.length}`;
      }
    });

    addBlock.appendChild(buttonAddRemove);

    const buttonBuy: HTMLButtonElement | null = document.createElement('button');
    buttonBuy.className = 'btn-buy-now';
    buttonBuy.innerText = 'BUY NOW';

    buttonBuy.addEventListener('click', () => {
      window.location.href = '/cart';

      let product = item;
      if (headerPrice) {
        if (localStorage.getItem('product-cart') && JSON.parse(localStorage.getItem('product-cart') || '')?.length) {
          let productStorage: IProductData[] = JSON.parse(localStorage.getItem('product-cart') || '[]');
          const isProductExist = productStorage.find((prod: IProductData) => prod.id === product?.id);
          if (isProductExist) {
            return;
          } else {
            if (product !== undefined) productStorage.push(product);
            buttonAddRemove.innerText = 'Drop from cart';
          }
          localStorage.setItem('product-cart', `${JSON.stringify(productStorage)}`);
          const result = productStorage.reduce((acc: number, prod: IProductData) => acc + prod.price*(prod.stockSelect || 1), 0);
          localStorage.setItem('result', `${result}`);
          headerPrice.innerText = `Total Price: ${result}€`;
        } else {
          localStorage.setItem('product-cart', `${JSON.stringify([product])}`);
          localStorage.setItem('result', `${product?.price}`);
          headerPrice.innerText = `Total Price: ${product?.price}€`;
          buttonAddRemove.innerText = 'Drop from cart';
        }
      }
      if (headerCount) {
        const productStorage: IProductData[] = JSON.parse(localStorage.getItem('product-cart') || '[]');
        localStorage.getItem('product-cart');
        function countStock() {
          let sum = 0;
          productStorage.forEach(function (prod) {
            sum += prod.stockSelect || 1;
          });
          return sum;
        }
        localStorage.setItem('storage-length', `${countStock()}`);
        headerCount.innerText = `${countStock()}`;
      }
    });

    addBlock.appendChild(buttonBuy);
  }
}
