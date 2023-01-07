import { IProductData } from '../../interfaces/index';
import '././styles/cart.scss';
export class CartMain {
  create(): void {
    const main: HTMLElement | null = document.querySelector('.main');
    const parentDivCart = document.createElement('div');
    parentDivCart.className = 'parent-div-cart';
    main?.appendChild(parentDivCart);
    const emptyCart = document.createElement('div');
    emptyCart.className = 'main-cart-empty';
    emptyCart.innerText = 'Cart is epmty. Add products to the cart.';
    const emptyCartButton = document.createElement('button');
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
      const productsInCart = document.createElement('div');
      productsInCart.className = 'products-in-cart';
      const summary = document.createElement('div');
      summary.className = 'summary';
      parentDivCart.appendChild(productsInCart);

      parentDivCart.appendChild(summary);
      const summaryName = document.createElement('h2');
      summaryName.innerText = 'Summary';
      summary.appendChild(summaryName);
      const totalProducts = document.createElement('div');
      totalProducts.className = 'total-products';
      const spanTotalProducts = document.createElement('span');
      spanTotalProducts.className = 'total-products__item';
      spanTotalProducts.innerText = `Products: ${summaryProducts}`;
      summary.appendChild(totalProducts);
      totalProducts.appendChild(spanTotalProducts);
      const totalPrice = document.createElement('div');
      totalPrice.className = 'total-price';
      const spanTotalPrice = document.createElement('span');
      spanTotalPrice.className = 'total-price__item';
      spanTotalPrice.innerText = `Total: € ${summaryTotal}`;
      summary.appendChild(totalPrice);
      totalPrice.appendChild(spanTotalPrice);
      const promoCode = document.createElement('div');
      promoCode.className = 'promo-code';
      summary.appendChild(promoCode);
      const inputSeachPromocod = document.createElement('input');
      inputSeachPromocod.className = 'input-search-promocod';
      inputSeachPromocod.type = 'search';
      inputSeachPromocod.placeholder = 'Enter promo code';

      promoCode.appendChild(inputSeachPromocod);
      const promoHint = document.createElement('span');
      promoHint.className = 'promo-hint';
      promoHint.innerText = 'Promo for test: "RS", "EPM"';
      summary.appendChild(promoHint);
      const buttonBuy = document.createElement('button');
      buttonBuy.className = 'button-buy';
      buttonBuy.innerText = 'BUY NOW';
      summary.appendChild(buttonBuy);

      const titleAndPageControl = document.createElement('div');
      titleAndPageControl.className = 'title-and-page-control';
      productsInCart.appendChild(titleAndPageControl);
      const titleAndPageControlName = document.createElement('h2');
      titleAndPageControlName.innerText = 'Products in cart';
      titleAndPageControl.appendChild(titleAndPageControlName);

      const pageControl = document.createElement('div');
      pageControl.className = 'page-control';
      titleAndPageControl.appendChild(pageControl);
      const limitPage = document.createElement('div');
      limitPage.className = 'limit-page';
      limitPage.innerText = 'ITEMS: ';
      pageControl.appendChild(limitPage);
      const inputLimitPage = document.createElement('input');
      inputLimitPage.className = 'limit-page__input';
      inputLimitPage.type = 'number';
      inputLimitPage.min = '1';
      inputLimitPage.max = `${this.getLocalStorage()?.length}`;
      inputLimitPage.value = `${this.getLocalStorage()?.length}`;
      limitPage.appendChild(inputLimitPage);

      const pageNumbers = document.createElement('div');
      pageNumbers.className = 'page-numbers';
      pageNumbers.innerText = 'PAGE: ';
      pageControl.appendChild(pageNumbers);
      const buttonPagePrev = document.createElement('button');
      buttonPagePrev.className = 'button-page';
      buttonPagePrev.innerText = '<';
      pageNumbers.appendChild(buttonPagePrev);
      const spanPageNumbers = document.createElement('span');
      spanPageNumbers.innerText = '1'; ///ТУТ МЕНЯЕТСЯ СТРАНИЦА
      pageNumbers.appendChild(spanPageNumbers);
      const buttonPageNext = document.createElement('button');
      buttonPageNext.className = 'button-page';
      buttonPageNext.innerText = '>';
      pageNumbers.appendChild(buttonPageNext);

      const prodItems = document.createElement('div');
      prodItems.className = 'prod-items';
      productsInCart.appendChild(prodItems);

      let itemNumberStart = 0;
      arrayProductsSelect.forEach((product: any) => {
        ++itemNumberStart;
        const productItemBlock = document.createElement('div');
        productItemBlock.className = 'product-item-block';
        prodItems.appendChild(productItemBlock);
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        productItemBlock.appendChild(cartItem);
        const itemNumber = document.createElement('div');
        itemNumber.className = 'item-n';
        itemNumber.innerText = `${itemNumberStart}`;
        cartItem.appendChild(itemNumber);
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        cartItem.appendChild(itemInfo);
        const imgItem = document.createElement('img');
        imgItem.src = `${product.thumbnail}`;
        itemInfo.appendChild(imgItem);
        const itemDetailProd = document.createElement('div');
        itemDetailProd.className = 'item-detail-p';
        itemInfo.appendChild(itemDetailProd);
        const productTitle = document.createElement('div');
        productTitle.className = 'product-title-cart';
        itemDetailProd.appendChild(productTitle);
        const nameProd = document.createElement('h3');
        nameProd.innerText = `${product.title}`;
        productTitle.appendChild(nameProd);
        const productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.innerText = `${product.description}`;
        itemDetailProd.appendChild(productDescription);
        const productOther = document.createElement('div');
        productOther.className = 'product-other';
        itemDetailProd.appendChild(productOther);
        const productRaiting = document.createElement('div');
        productRaiting.className = 'product-other-one-block';
        productRaiting.innerText = `Rating: ${product.rating}`;
        const productDiscount = document.createElement('div');
        productDiscount.className = 'product-other-one-block';
        productDiscount.innerText = `Discount: ${product.discountPercentage}`;
        productOther.appendChild(productRaiting);
        productOther.appendChild(productDiscount);

        const numberControl = document.createElement('div');
        numberControl.className = 'number-control';
        cartItem.appendChild(numberControl);
        const stockControl = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.innerText = `Stock: ${product.stock}`;
        numberControl.appendChild(stockControl);
        const incDecControl = document.createElement('div');
        incDecControl.className = 'incDec-control';
        numberControl.appendChild(incDecControl);
        const buttonPlus = document.createElement('button');
        buttonPlus.className = 'button-stock';
        buttonPlus.innerText = '+';
        incDecControl.appendChild(buttonPlus);
        const spanStockCount = document.createElement('span');
        spanStockCount.innerText = `${product.stockSelect}`;
        incDecControl.appendChild(spanStockCount);
        const buttonMinus = document.createElement('button');
        buttonMinus.className = 'button-stock button-stock_minus';
        buttonMinus.innerText = '-';
        incDecControl.appendChild(buttonMinus);
        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.innerText = `€ ${product.price}`;
        numberControl.appendChild(amountControl);

        let countStock: any = spanStockCount.innerText;
        const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
        const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');

        buttonPlus.addEventListener('click', (event) => {
          spanStockCount.innerText = `${++countStock}`;
          const updtedStockSelect = arrayProductsSelect.map((item: any) => {
            if (item.id === product.id) {
              item.stockSelect = +spanStockCount.innerText;
              return item;
            } else {
              return item;
            }
          });
          console.log(updtedStockSelect);
          localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);

          const resultStorage: any = localStorage.getItem('result');
          const result = +resultStorage + product.price;
          headerPrice!.innerText = `Total Price: ${result}€`;
          const resultStorageLength: any = localStorage.getItem('storage-length');
          const resultLength = +resultStorageLength + 1;
          headerCount!.innerText = `${resultLength}`;
          spanTotalProducts.innerText = `Products: ${resultLength}`;
          spanTotalPrice.innerText = `Total: € ${result}`;
          localStorage.setItem('result', `${result}`);
          localStorage.setItem('storage-length', `${resultLength}`);
          if (+countStock === product.stock) {
            buttonPlus.disabled = true;
          }
        });

        buttonMinus.addEventListener('click', () => {
          spanStockCount.innerText = `${--countStock}`;
          let productStorage = JSON.parse(localStorage.getItem('product-cart') as string);
          const resultStorage: any = localStorage.getItem('result');
          const result = +resultStorage - product.price;
          headerPrice!.innerText = `Total Price: ${result}€`;
          const resultStorageLength: any = localStorage.getItem('storage-length');
          const resultLength = +resultStorageLength - 1;
          headerCount!.innerText = `${resultLength}`;
          spanTotalProducts.innerText = `Products: ${resultLength}`;
          spanTotalPrice.innerText = `Total: € ${result}`;
          localStorage.setItem('result', `${result}`);
          localStorage.setItem('storage-length', `${resultLength}`);
          if (+countStock === 0) {
            productItemBlock.remove();
            const isProductExist = productStorage.find((prod: any) => prod.id === product?.id);
            if (isProductExist) {
              productStorage = productStorage.filter((item: any) => item.id !== product?.id);
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
          } else {
            const updtedStockSelect = arrayProductsSelect.map((item: any) => {
              if (item.id === product.id) {
                item.stockSelect = +spanStockCount.innerText;
                return item;
              } else {
                return item;
              }
            });
            localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);
          }
          this.handleInputLimitValue();
        });
      });
    }
    this.handlePagination();
    // this.inputLimitValidate();
  }

  createCartCatalog() {
    const productsSelect = localStorage.getItem('product-cart');
    if (productsSelect) {
      let arrayProductsSelect: IProductData[] | undefined = JSON.parse(productsSelect);
    }
  }

  clearCartCatalog() {
    const productItemsContainer = document.querySelector('.prod-items');
    productItemsContainer?.remove();
  }

  getLocalStorage(): IProductData[] | undefined {
    const localStorageCartProductsString = localStorage.getItem('product-cart');
    if (localStorageCartProductsString) {
      const localStorageCartProductsArray = JSON.parse(localStorageCartProductsString);
      return localStorageCartProductsArray;
    }
  }

  handleInputLimitValue() {
    const inputLimitPage: HTMLInputElement | null = document.querySelector('.limit-page__input');
    // const minusButtons = document.querySelectorAll('.button-stock_minus');
    // const minusButtonsArr = [...minusButtons];

    if (inputLimitPage) {
      inputLimitPage.type = 'number';
      inputLimitPage.min = '1';
      inputLimitPage.max = `${this.getLocalStorage()?.length}`;
      inputLimitPage.value = `${this.getLocalStorage()?.length}`;
      // minusButtonsArr.forEach((button) => {
      //   button.addEventListener('click', () => {
      //     inputLimitPage.value = `${this.getLocalStorage()?.length}`;
      //   });
      // });
    }
  }

  updateCartCatalog() {
    const cartProductsContainer = document.querySelector('.products-in-cart');
    const inputLimitPage: HTMLInputElement | null = document.querySelector('.limit-page__input');
    const cartProducts = this.getLocalStorage();
    const spanTotalProducts: HTMLSpanElement | null = document.querySelector('.total-products__item');
    const spanTotalPrice: HTMLSpanElement | null = document.querySelector('.total-price__item');
    const productsInCart: HTMLDivElement | null = document.querySelector('.products-in-cart');
    const summary: HTMLDivElement | null = document.querySelector('.summary');
    const parentDivCart: HTMLDivElement | null = document.querySelector('.parent-div-cart');
    // const emptyCart: HTMLDivElement | null = document.querySelector('.main-cart-empty');
    // const emptyCartButton: HTMLButtonElement | null = document.querySelector('.main-cart-empty-button');

    const emptyCart = document.createElement('div');
    emptyCart.className = 'main-cart-empty';
    emptyCart.innerText = 'Cart is epmty. Add products to the cart.';
    const emptyCartButton = document.createElement('button');
    emptyCartButton.className = 'main-cart-empty-button pulse';
    emptyCartButton.innerText = 'Back to goods';

    if (
      inputLimitPage &&
      cartProducts &&
      cartProductsContainer &&
      spanTotalProducts &&
      spanTotalPrice &&
      productsInCart &&
      summary &&
      parentDivCart
    ) {
      const prodItems = document.createElement('div');
      prodItems.className = 'prod-items';
      cartProductsContainer.appendChild(prodItems);

      for (let i = 0; i < +inputLimitPage.value; i += 1) {
        if (+inputLimitPage.value > cartProducts.length) {
          inputLimitPage.value = cartProducts.length.toString();
        }
        const productItemBlock = document.createElement('div');
        productItemBlock.className = 'product-item-block';
        prodItems.appendChild(productItemBlock);
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        productItemBlock.appendChild(cartItem);
        const itemNumber = document.createElement('div');
        itemNumber.className = 'item-n';
        itemNumber.innerText = `${i + 1}`;
        cartItem.appendChild(itemNumber);
        const itemInfo = document.createElement('div');
        itemInfo.className = 'item-info';
        cartItem.appendChild(itemInfo);
        const imgItem = document.createElement('img');
        imgItem.src = `${cartProducts[i].thumbnail}`;
        itemInfo.appendChild(imgItem);
        const itemDetailProd = document.createElement('div');
        itemDetailProd.className = 'item-detail-p';
        itemInfo.appendChild(itemDetailProd);
        const productTitle = document.createElement('div');
        productTitle.className = 'product-title-cart';
        itemDetailProd.appendChild(productTitle);
        const nameProd = document.createElement('h3');
        nameProd.innerText = `${cartProducts[i].title}`;
        productTitle.appendChild(nameProd);
        const productDescription = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.innerText = `${cartProducts[i].description}`;
        itemDetailProd.appendChild(productDescription);
        const productOther = document.createElement('div');
        productOther.className = 'product-other';
        itemDetailProd.appendChild(productOther);
        const productRaiting = document.createElement('div');
        productRaiting.className = 'product-other-one-block';
        productRaiting.innerText = `Rating: ${cartProducts[i].rating}`;
        const productDiscount = document.createElement('div');
        productDiscount.className = 'product-other-one-block';
        productDiscount.innerText = `Discount: ${cartProducts[i].discountPercentage}`;
        productOther.appendChild(productRaiting);
        productOther.appendChild(productDiscount);

        const numberControl = document.createElement('div');
        numberControl.className = 'number-control';
        cartItem.appendChild(numberControl);
        const stockControl = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.innerText = `Stock: ${cartProducts[i].stock}`;
        numberControl.appendChild(stockControl);
        const incDecControl = document.createElement('div');
        incDecControl.className = 'incDec-control';
        numberControl.appendChild(incDecControl);
        const buttonPlus = document.createElement('button');
        buttonPlus.className = 'button-stock';
        buttonPlus.innerText = '+';
        incDecControl.appendChild(buttonPlus);
        const spanStockCount = document.createElement('span');
        spanStockCount.innerText = `${cartProducts[i].stockSelect}`;
        incDecControl.appendChild(spanStockCount);
        const buttonMinus = document.createElement('button');
        buttonMinus.className = 'button-stock button-stock_minus';
        buttonMinus.innerText = '-';
        incDecControl.appendChild(buttonMinus);
        const amountControl = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.innerText = `€ ${cartProducts[i].price}`;
        numberControl.appendChild(amountControl);

        let countStock: any = spanStockCount.innerText;
        const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
        const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');

        buttonPlus.addEventListener('click', (event) => {
          spanStockCount.innerText = `${++countStock}`;
          const updtedStockSelect = cartProducts.map((item: any) => {
            if (item.id === cartProducts[i].id) {
              item.stockSelect = +spanStockCount.innerText;
              return item;
            } else {
              return item;
            }
          });
          console.log(updtedStockSelect);
          localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);

          const resultStorage: any = localStorage.getItem('result');
          const result = +resultStorage + cartProducts[i].price;
          headerPrice!.innerText = `Total Price: ${result}€`;
          const resultStorageLength: any = localStorage.getItem('storage-length');
          const resultLength = +resultStorageLength + 1;
          headerCount!.innerText = `${resultLength}`;
          spanTotalProducts.innerText = `Products: ${resultLength}`;
          spanTotalPrice.innerText = `Total: € ${result}`;
          localStorage.setItem('result', `${result}`);
          localStorage.setItem('storage-length', `${resultLength}`);
          if (+countStock === cartProducts[i].stock) {
            buttonPlus.disabled = true;
          }
        });

        buttonMinus.addEventListener('click', () => {
          spanStockCount.innerText = `${--countStock}`;
          let productStorage = JSON.parse(localStorage.getItem('product-cart') as string);
          const resultStorage: any = localStorage.getItem('result');
          const result = +resultStorage - cartProducts[i].price;
          headerPrice!.innerText = `Total Price: ${result}€`;
          const resultStorageLength: any = localStorage.getItem('storage-length');
          const resultLength = +resultStorageLength - 1;
          headerCount!.innerText = `${resultLength}`;
          spanTotalProducts.innerText = `Products: ${resultLength}`;
          spanTotalPrice.innerText = `Total: € ${result}`;
          localStorage.setItem('result', `${result}`);
          localStorage.setItem('storage-length', `${resultLength}`);
          if (+countStock === 0) {
            productItemBlock.remove();

            const isProductExist = productStorage.find((prod: any) => prod.id === cartProducts[i]?.id);
            if (isProductExist) {
              productStorage = productStorage.filter((item: any) => item.id !== cartProducts[i]?.id);
            }
            localStorage.setItem('product-cart', `${JSON.stringify(productStorage)}`);
            if (productStorage.length === 0 && emptyCart && emptyCartButton) {
              productsInCart.remove();
              summary.remove();
              parentDivCart.appendChild(emptyCart);
              parentDivCart.appendChild(emptyCartButton);
              emptyCartButton.addEventListener('click', () => {
                window.location.href = '/';
              });
            }
          } else {
            const updtedStockSelect = cartProducts.map((item: any) => {
              if (item.id === cartProducts[i].id) {
                item.stockSelect = +spanStockCount.innerText;
                return item;
              } else {
                return item;
              }
            });
            localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);
          }
          this.handleInputLimitValue();
        });
      }
    }
  }

  handlePagination() {
    const inputLimitPage: HTMLInputElement | null = document.querySelector('.limit-page__input');
    const productItemsContainer = document.querySelector('.prod-items');
    const productItems = productItemsContainer?.childNodes;
    const localStorageCartProductsArray = this.getLocalStorage();
    const productItemsArr: ChildNode[] = [];
    if (inputLimitPage && productItems) {
      productItems.forEach((item) => {
        productItemsArr.push(item);
      });
      inputLimitPage.addEventListener('input', () => {
        this.clearCartCatalog();
        this.updateCartCatalog();
      });
    }
  }
}
