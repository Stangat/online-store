import { IProductData } from '../../interfaces/index';
import '././styles/cart.scss';
export class CartMain {
  create(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const parentDivCart: HTMLDivElement | null = document.createElement('div');
    parentDivCart.className = 'parent-div-cart';
    main?.appendChild(parentDivCart);
    const emptyCart: HTMLDivElement | null = document.createElement('div');
    emptyCart.className = 'main-cart-empty';
    emptyCart.innerText = 'Cart is epmty. Add products to the cart.';
    const emptyCartButton: HTMLButtonElement | null = document.createElement('button');
    emptyCartButton.className = 'main-cart-empty-button pulse';
    emptyCartButton.innerText = 'Back to goods';
    const productsSelect = localStorage.getItem('product-cart');
    let arrayProductsSelect = (productsSelect && JSON.parse(productsSelect)) || [];

    if (arrayProductsSelect?.length === 0) {
      parentDivCart?.appendChild(emptyCart);
      parentDivCart?.appendChild(emptyCartButton);
      emptyCartButton.addEventListener('click', () => {
        window.location.href = '/';
      });
    } else {
      const summaryProducts = localStorage.getItem('storage-length');
      const summaryTotal = localStorage.getItem('result');
      const productsInCart: HTMLDivElement | null = document.createElement('div');
      productsInCart.className = 'products-in-cart';
      const summary: HTMLDivElement | null = document.createElement('div');
      summary.className = 'summary';
      parentDivCart.appendChild(productsInCart);

      parentDivCart.appendChild(summary);
      const summaryName: HTMLElement | null = document.createElement('h2');
      summaryName.innerText = 'Summary';
      summary.appendChild(summaryName);
      const totalProducts: HTMLDivElement | null = document.createElement('div');
      totalProducts.className = 'total-products';
      const spanTotalProducts: HTMLSpanElement | null = document.createElement('span');
      spanTotalProducts.innerText = `Products: ${summaryProducts}`;
      summary.appendChild(totalProducts);
      totalProducts.appendChild(spanTotalProducts);
      const totalPrice: HTMLDivElement | null = document.createElement('div');
      totalPrice.className = 'total-price';
      const spanTotalPrice: HTMLSpanElement | null = document.createElement('span');
      spanTotalPrice.innerText = `Total: € ${summaryTotal}`;
      summary.appendChild(totalPrice);
      totalPrice.appendChild(spanTotalPrice);
      const promoCode: HTMLDivElement | null = document.createElement('div');
      promoCode.className = 'promo-code';
      summary.appendChild(promoCode);
      const inputSeachPromocod: HTMLInputElement | null = document.createElement('input');
      inputSeachPromocod.className = 'input-search-promocod';
      inputSeachPromocod.type = 'search';
      inputSeachPromocod.placeholder = 'Enter promo code';

      promoCode.appendChild(inputSeachPromocod);
      const promoHint: HTMLSpanElement | null = document.createElement('span');
      promoHint.className = 'promo-hint';
      promoHint.innerText = 'Promo for test: "RS", "EPM"';
      summary.appendChild(promoHint);
      const buttonBuy: HTMLButtonElement | null = document.createElement('button');
      buttonBuy.className = 'button-buy';
      buttonBuy.innerText = 'BUY NOW';
      summary.appendChild(buttonBuy);

      const titleAndPageControl: HTMLDivElement | null = document.createElement('div');
      titleAndPageControl.className = 'title-and-page-control';
      productsInCart.appendChild(titleAndPageControl);
      const titleAndPageControlName: HTMLElement | null = document.createElement('h2');
      titleAndPageControlName.innerText = 'Products in cart';
      titleAndPageControl.appendChild(titleAndPageControlName);

      const pageControl: HTMLDivElement | null = document.createElement('div');
      pageControl.className = 'page-control';
      titleAndPageControl.appendChild(pageControl);
      const limitPage: HTMLDivElement | null = document.createElement('div');
      limitPage.className = 'limit-page';
      limitPage.innerText = 'ITEMS: ';
      pageControl.appendChild(limitPage);
      const inputLimitPage: HTMLInputElement | null = document.createElement('input');
      inputLimitPage.type = 'text';
      limitPage.appendChild(inputLimitPage);

      const pageNumbers: HTMLDivElement | null = document.createElement('div');
      pageNumbers.className = 'page-numbers';
      pageNumbers.innerText = 'PAGE: ';
      pageControl.appendChild(pageNumbers);
      const buttonPagePrev: HTMLButtonElement | null = document.createElement('button');
      buttonPagePrev.className = 'button-page';
      buttonPagePrev.innerText = '<';
      pageNumbers.appendChild(buttonPagePrev);
      const spanPageNumbers: HTMLSpanElement | null = document.createElement('span');
      spanPageNumbers.innerText = '1'; ///ТУТ МЕНЯЕТСЯ СТРАНИЦА
      pageNumbers.appendChild(spanPageNumbers);
      const buttonPageNext: HTMLButtonElement | null = document.createElement('button');
      buttonPageNext.className = 'button-page';
      buttonPageNext.innerText = '>';
      pageNumbers.appendChild(buttonPageNext);

      const prodItems: HTMLDivElement | null = document.createElement('div');
      prodItems.className = 'prod-items';
      productsInCart.appendChild(prodItems);

      let itemNumberStart = 0;
      arrayProductsSelect.forEach((product: IProductData) => {
        ++itemNumberStart;
        const productItemBlock: HTMLDivElement | null = document.createElement('div');
        productItemBlock.className = 'product-item-block';
        prodItems.appendChild(productItemBlock);
        const cartItem: HTMLDivElement | null = document.createElement('div');
        cartItem.className = 'cart-item';
        productItemBlock.appendChild(cartItem);
        const itemNumber: HTMLDivElement | null = document.createElement('div');
        itemNumber.className = 'item-n';
        itemNumber.innerText = `${itemNumberStart}`;
        cartItem.appendChild(itemNumber);
        const itemInfo: HTMLDivElement | null = document.createElement('div');
        itemInfo.className = 'item-info';
        cartItem.appendChild(itemInfo);
        const imgItem: HTMLImageElement | null = document.createElement('img');
        imgItem.src = `${product.thumbnail}`;
        itemInfo.appendChild(imgItem);
        const itemDetailProd: HTMLDivElement | null = document.createElement('div');
        itemDetailProd.className = 'item-detail-p';
        itemInfo.appendChild(itemDetailProd);
        const productTitle: HTMLDivElement | null = document.createElement('div');
        productTitle.className = 'product-title-cart';
        itemDetailProd.appendChild(productTitle);
        const nameProd: HTMLElement | null = document.createElement('h3');
        nameProd.innerText = `${product.title}`;
        productTitle.appendChild(nameProd);
        const productDescription: HTMLDivElement | null = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.innerText = `${product.description}`;
        itemDetailProd.appendChild(productDescription);
        const productOther: HTMLDivElement | null = document.createElement('div');
        productOther.className = 'product-other';
        itemDetailProd.appendChild(productOther);
        const productRaiting: HTMLDivElement | null = document.createElement('div');
        productRaiting.className = 'product-other-one-block';
        productRaiting.innerText = `Rating: ${product.rating}`;
        const productDiscount: HTMLDivElement | null = document.createElement('div');
        productDiscount.className = 'product-other-one-block';
        productDiscount.innerText = `Discount: ${product.discountPercentage}`;
        productOther.appendChild(productRaiting);
        productOther.appendChild(productDiscount);

        const numberControl: HTMLDivElement | null = document.createElement('div');
        numberControl.className = 'number-control';
        cartItem.appendChild(numberControl);
        const stockControl: HTMLDivElement | null = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.innerText = `Stock: ${product.stock}`;
        numberControl.appendChild(stockControl);
        const incDecControl: HTMLDivElement | null = document.createElement('div');
        incDecControl.className = 'incDec-control';
        numberControl.appendChild(incDecControl);
        const buttonPlus: HTMLButtonElement | null = document.createElement('button');
        buttonPlus.className = 'button-stock';
        buttonPlus.innerText = '+';
        incDecControl.appendChild(buttonPlus);
        const spanStockCount: HTMLSpanElement | null = document.createElement('span');
        spanStockCount.innerText = `${product.stockSelect}`;
        incDecControl.appendChild(spanStockCount);
        const buttonMinus: HTMLButtonElement | null = document.createElement('button');
        buttonMinus.className = 'button-stock';
        buttonMinus.innerText = '-';
        incDecControl.appendChild(buttonMinus);
        const amountControl: HTMLDivElement | null = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.innerText = `€ ${product.price}`;
        numberControl.appendChild(amountControl);

        let countStock: number = +spanStockCount.innerText;
        const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
        const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');

        buttonPlus.addEventListener('click', (event) => {
          spanStockCount.innerText = `${++countStock}`;
          const updtedStockSelect = arrayProductsSelect.map((item: IProductData) => {
            if (item.id === product.id) {
              item.stockSelect = +spanStockCount.innerText;
              return item;
            } else {
              return item;
            }
          });
          localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);

          const resultStorage: string | null = localStorage.getItem('result');
          console.log(resultStorage);
          if (resultStorage !== null) {
            const result = +resultStorage + product.price;
            headerPrice!.innerText = `Total Price: ${result}€`;
            const resultStorageLength: string | null = localStorage.getItem('storage-length');
            if (resultStorageLength !== null) {
              const resultLength = +resultStorageLength + 1;
              headerCount!.innerText = `${resultLength}`;
              spanTotalProducts.innerText = `Products: ${resultLength}`;
              spanTotalPrice.innerText = `Total: € ${result}`;
              localStorage.setItem('result', `${result}`);
              localStorage.setItem('storage-length', `${resultLength}`);
              if (+countStock === product.stock) {
                buttonPlus.disabled = true;
              }
            }
          }
        });

        buttonMinus.addEventListener('click', () => {
          spanStockCount.innerText = `${--countStock}`;
          let productStorage: IProductData[] = JSON.parse(localStorage.getItem('product-cart') || '[]');
          const resultStorage: string | null = localStorage.getItem('result');
          if (resultStorage !== null) {
            const result = +resultStorage - product.price;
            if (headerPrice) headerPrice.innerText = `Total Price: ${result}€`;
            const resultStorageLength: string | null = localStorage.getItem('storage-length');
            if (resultStorageLength !== null) {
              const resultLength = +resultStorageLength - 1;
              if (headerCount) headerCount.innerText = `${resultLength}`;
              spanTotalProducts.innerText = `Products: ${resultLength}`;
              spanTotalPrice.innerText = `Total: € ${result}`;
              localStorage.setItem('result', `${result}`);
              localStorage.setItem('storage-length', `${resultLength}`);
              if (+countStock === 0) {
                productItemBlock.remove();
                const isProductExist = productStorage.find((prod: IProductData) => prod.id === product?.id);
                if (isProductExist) {
                  productStorage = productStorage.filter((item: IProductData) => item.id !== product?.id);
                }
                localStorage.setItem('product-cart', `${JSON.stringify(productStorage)}`);
                if (productStorage.length === 0) {
                  productsInCart.remove();
                  summary.remove();
                  parentDivCart?.appendChild(emptyCart);
                  parentDivCart?.appendChild(emptyCartButton);
                  emptyCartButton.addEventListener('click', () => {
                    window.location.href = '/';
                  });
                }
              }
            }
          } else {
            const updtedStockSelect = arrayProductsSelect.map((item: IProductData) => {
              if (item.id === product.id) {
                item.stockSelect = +spanStockCount.innerText;
                return item;
              } else {
                return item;
              }
            });
            localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);
          }
        });
      });
    }
  }
}
