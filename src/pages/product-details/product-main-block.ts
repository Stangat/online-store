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
    button.innerText = 'Next';
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

    const addBlock = document.createElement('div');
    addBlock.className = 'add-block';
    productData.appendChild(addBlock);
  }
}
