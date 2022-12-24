import { onlineStoreData } from '../../data/data';

import './product.scss';
export class ProductMain {
  create(id: number): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const item = onlineStoreData.products.find((item) => item.id === id);
    const productsBlock = document.createElement('div');
    productsBlock.className = 'product-details';
    main?.appendChild(productsBlock);
    const linkNavigation = document.createElement('div');
    linkNavigation.className = 'link-paths';
    productsBlock.appendChild(linkNavigation);
    const linkMain = document.createElement('a');
    linkMain.className = 'link-paths-main';
    linkMain.href = '/';
    linkMain.innerText = 'STORE';
    linkNavigation.appendChild(linkMain);
    const separatorLink = document.createElement('div');
    separatorLink.innerText = ' >> ';
    linkNavigation.appendChild(separatorLink);
    const linkCategory = document.createElement('a');
    linkCategory.className = 'link-paths-category';
    linkCategory.innerText = `${item?.category}`;
    linkNavigation.appendChild(linkCategory);
    const separatorLinkTwo = document.createElement('div');
    separatorLinkTwo.innerText = ' >> ';
    linkNavigation.appendChild(separatorLinkTwo);
    const linkBrand = document.createElement('a');
    linkBrand.className = 'link-paths-brand';
    linkBrand.innerText = `${item?.brand}`;
    linkNavigation.appendChild(linkBrand);
    const separatorLinkThree = document.createElement('div');
    separatorLinkThree.innerText = ' >> ';
    linkNavigation.appendChild(separatorLinkThree);
    const linkTitle = document.createElement('a');
    linkTitle.className = 'link-paths-title';
    linkTitle.innerText = `${item?.title}`;
    linkNavigation.appendChild(linkTitle);

    const productDetail = document.createElement('div');
    productDetail.className = 'product-detail';
    productsBlock.appendChild(productDetail);
    const productTitle = document.createElement('div');
    productTitle.className = 'product-title';
    productTitle.innerText = `${item?.title}`;
    productDetail.appendChild(productTitle);
    const productData = document.createElement('div');
    productData.className = 'product-data';
    productDetail.appendChild(productData);

    const productPhotos = document.createElement('div');
    productPhotos.className = 'product-photos';
    item?.images.forEach((image) => {
      const img: HTMLImageElement | null = document.createElement('img');
      img.src = `${image}`;
      productPhotos.appendChild(img);
    });
    const firstImage = productPhotos.firstChild;
    if (firstImage instanceof HTMLImageElement) firstImage.className = 'block';
    productData.appendChild(productPhotos);
    const button = document.createElement('button');
    button.className = 'btnRight';
    button.innerText = 'NEXT';
    productPhotos.appendChild(button)
    let slides = document.querySelectorAll('.product-photos img');
    let i = 0;

    button.addEventListener('click', function () {
      ++i;
      if (i >= slides.length) {
        slides[i - 1].classList.remove('block');
        i = 0;
        slides[i].classList.add('block');
      } else {
        slides[i - 1].classList.remove('block');
        slides[i].classList.add('block');
      }
    });

    const productInfo = document.createElement('div');
    productInfo.className = 'product-info';
    productData.appendChild(productInfo);

    const productDescription = document.createElement('div');
    productDescription.className = 'product-detail-item';
    //productDescription.innerText = 'Description'
    productInfo.appendChild(productDescription);
    const productDescriptionTitle = document.createElement('h3');
    productDescriptionTitle.className = 'product-item-title';
    productDescriptionTitle.innerText = 'Description'
    productDescription.appendChild(productDescriptionTitle);
    const productDescriptionText = document.createElement('p');
    productDescriptionText.className = 'product-item-text';
    productDescriptionText.innerText = `${item?.description}`
    productDescription.appendChild(productDescriptionText);

    const productDiscount = document.createElement('div');
    productDiscount.className = 'product-detail-item';
   // productDiscount.innerText = 'Discount Percentage'
    productInfo.appendChild(productDiscount);
    const productDiscountTitle = document.createElement('h3');
    productDiscountTitle.className = 'product-item-title';
    productDiscountTitle.innerText = 'Discount Percentage'
    productDiscount.appendChild(productDiscountTitle);
    const productDiscountText = document.createElement('p');
    productDiscountText.className = 'product-item-text';
    productDiscountText.innerText = `${item?.discountPercentage}`
    productDiscount.appendChild(productDiscountText);

    const productRaiting = document.createElement('div');
    productRaiting.className = 'product-detail-item';
    //productRaiting.innerText = 'Raiting'
    productInfo.appendChild(productRaiting);
    const productRaitingTitle = document.createElement('h3');
    productRaitingTitle.className = 'product-item-title';
    productRaitingTitle.innerText = 'Raiting'
    productRaiting.appendChild(productRaitingTitle);
    const productRaitingText = document.createElement('p');
    productRaitingText.className = 'product-item-text';
    productRaitingText.innerText = `${item?.rating}`
    productRaiting.appendChild(productRaitingText);

    const productStock = document.createElement('div');
    productStock.className = 'product-detail-item';
    //productStock.innerText = 'Stock'
    productInfo.appendChild(productStock);
    const productStockTitle = document.createElement('h3');
    productStockTitle.className = 'product-item-title';
    productStockTitle.innerText = 'Stock'
    productStock.appendChild(productStockTitle);
    const productStockText = document.createElement('p');
    productStockText.className = 'product-item-text';
    productStockText.innerText = `${item?.stock}`
    productStock.appendChild(productStockText);

    const productBrand = document.createElement('div');
    productBrand.className = 'product-detail-item';
    //productBrand.innerText = 'Brand'
    productInfo.appendChild(productBrand);
    const productBrandTitle = document.createElement('h3');
    productBrandTitle.className = 'product-item-title';
    productBrandTitle.innerText = 'Brand'
    productBrand.appendChild(productBrandTitle);
    const productBrandText = document.createElement('p');
    productBrandText.className = 'product-item-text';
    productBrandText.innerText = `${item?.brand}`
    productBrand.appendChild(productBrandText);

    const productCategory = document.createElement('div');
    productCategory.className = 'product-detail-item';
    //productCategory.innerText = 'Category'
    productInfo.appendChild(productCategory);
    const productCategoryTitle = document.createElement('h3');
    productCategoryTitle.className = 'product-item-title';
    productCategoryTitle.innerText = 'Category'
    productCategory.appendChild(productCategoryTitle);
    const productCategoryText = document.createElement('p');
    productCategoryText.className = 'product-item-text';
    productCategoryText.innerText = `${item?.category}`
    productCategory.appendChild(productCategoryText);

    const addBlock = document.createElement('div');
    addBlock.className = 'add-block';
    productData.appendChild(addBlock);
    const cartButton = document.createElement('div');
    cartButton.className = 'cart-button';
    cartButton.innerText = `€ ${item?.price}`
    addBlock.appendChild(cartButton);
    const buttonAddRemove = document.createElement('button');
    buttonAddRemove.className = 'btn-add-remove';
    buttonAddRemove.innerText = 'ADD TO CART';
    addBlock.appendChild(buttonAddRemove)
    const buttonByu = document.createElement('button');
    buttonByu.className = 'btn-buy-now';
    buttonByu.innerText = 'BUY NOW';
    addBlock.appendChild(buttonByu)
  }
}
