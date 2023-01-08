import { DiscontType, IProductData } from '../../interfaces/index';
import '././styles/cart.scss';

export class CartMain {
  private appliedDiscounts: DiscontType[];
  summaryTotal: number;
  existDisconts: DiscontType[] = [
    { id: 1, promoCode: 'rs', discont: 10, description: 'Rolling Scopes School - 10%' },
    { id: 2, promoCode: 'epm', discont: 10, description: 'EPAM Systems - 10%' },
  ];
  constructor() {
    const storageDiscount = localStorage.getItem('discount');
    this.appliedDiscounts = (storageDiscount && JSON.parse(storageDiscount)) || [];
    const storageSummaryTotal = localStorage.getItem('result');
    this.summaryTotal = (storageSummaryTotal && JSON.parse(storageSummaryTotal)) || 0;
  }

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
      spanTotalProducts.className = 'total-products__item';
      spanTotalProducts.innerText = `Products: ${summaryProducts}`;
      summary.appendChild(totalProducts);
      totalProducts.appendChild(spanTotalProducts);
      const totalPrice: HTMLDivElement | null = document.createElement('div');
      totalPrice.className = 'total-price';
      const spanTotalPrice: HTMLSpanElement | null = document.createElement('span');
      spanTotalPrice.className = 'span-total-price';
      if (this.appliedDiscounts.length) {
        spanTotalPrice.style.textDecoration = 'line-through';
      } else {
        spanTotalPrice.style.textDecoration = 'none';
      }
      spanTotalPrice.innerText = `Total: € ${this.summaryTotal}`;
      summary.appendChild(totalPrice);
      totalPrice.appendChild(spanTotalPrice);

      const addBlock = document.createElement('div');
      addBlock.className = 'applied-promocode';
      summary.appendChild(addBlock);

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
      inputLimitPage.className = 'limit-page__input';
      inputLimitPage.type = 'number';
      inputLimitPage.min = '1';
      inputLimitPage.max = `${this.getLocalStorage()?.length}`;
      inputLimitPage.value = `${this.getLocalStorage()?.length}`;
      limitPage.appendChild(inputLimitPage);

      const pageNumbers: HTMLDivElement | null = document.createElement('div');
      pageNumbers.className = 'page-numbers';
      pageNumbers.innerText = 'PAGE: ';
      pageControl.appendChild(pageNumbers);
      const buttonPagePrev: HTMLButtonElement | null = document.createElement('button');
      buttonPagePrev.className = 'button-page button-page_left';
      buttonPagePrev.innerText = '<';
      pageNumbers.appendChild(buttonPagePrev);
      const spanPageNumbers: HTMLSpanElement | null = document.createElement('span');
      spanPageNumbers.innerText = '1'; ///ТУТ МЕНЯЕТСЯ СТРАНИЦА
      pageNumbers.appendChild(spanPageNumbers);
      const buttonPageNext: HTMLButtonElement | null = document.createElement('button');
      buttonPageNext.className = 'button-page button-page_right';
      buttonPageNext.innerText = '>';
      pageNumbers.appendChild(buttonPageNext);

      const prodItems: HTMLDivElement | null = document.createElement('div');
      prodItems.className = 'prod-items';
      productsInCart.appendChild(prodItems);

      const updateTotalPrice = () => {
        const newTotal = document.createElement('span');
        const discountSum = this.appliedDiscounts.reduce((acc, item) => (acc += item.discont), 0);
        const discountedPrice = this.summaryTotal - (this.summaryTotal * discountSum) / 100;
        newTotal.innerText = `Total: ${discountedPrice}`;
        newTotal.className = 'new-total';
        document.querySelectorAll('.new-total').forEach((item) => item.remove());
        if (!this.appliedDiscounts.length) {
          spanTotalPrice.style.textDecoration = 'none';
          return;
        } else {
          totalPrice.appendChild(newTotal);
          spanTotalPrice.style.textDecoration = 'line-through';
        }
      };

      const createDiscontBlock = (discont: DiscontType): HTMLElement => {
        const addBlock = document.createElement('div');
        addBlock.className = 'applied';
        addBlock.setAttribute('promo-id', discont.id.toString());
        if (this.appliedDiscounts.length === 1) {
          const titleBlock = document.createElement('div');
          titleBlock.innerText = 'Applied promocode:';
          titleBlock.className = 'title-block';
          addBlock.appendChild(titleBlock);
          totalPrice.appendChild(addBlock);
        }
        const aplCode = document.createElement('span');
        aplCode.innerHTML = discont.description;
        const dropButton = document.createElement('button');
        dropButton.innerText = 'DROP';
        dropButton.className = `drop-${discont.promoCode}`;
        dropButton.addEventListener('click', () => {
          removeDiscount(discont);
        });
        aplCode.appendChild(dropButton);
        addBlock.appendChild(aplCode);
        return addBlock;
      };

      const renderPromo = () => {
        const promocodesBlock = document.querySelector('.applied-promocode');
        promocodesBlock!.innerHTML = '';
        this.appliedDiscounts.forEach((item) => {
          const discountBlock = createDiscontBlock(item);
          promocodesBlock?.appendChild(discountBlock);
        });
        updateTotalPrice();
      };

      const addDiscont = (discount: DiscontType) => {
        const isAppliedDiscontExist = this.appliedDiscounts.find((disc) => disc.id === discount.id);
        if (isAppliedDiscontExist) {
          return;
        } else {
          this.appliedDiscounts.push(discount);
          localStorage.setItem('discount', JSON.stringify(this.appliedDiscounts));
        }
        const addButton: HTMLButtonElement | null = document.querySelector(`.${discount.promoCode}`);
        if (addButton) addButton.style.display = 'none';
        renderPromo();
      };

      const removeDiscount = (discount: DiscontType) => {
        this.appliedDiscounts = this.appliedDiscounts.filter((disc) => disc.id !== discount.id);
        localStorage.setItem('discount', JSON.stringify(this.appliedDiscounts));
        const addButton: HTMLButtonElement | null = document.querySelector(`.${discount.promoCode}`);
        if (addButton) addButton.style.display = 'block';
        renderPromo();
      };

      const createAddDiscountBlock = (discount: DiscontType) => {
        const addDiscount = document.createElement('span');
        addDiscount.className = 'add-discount';
        addDiscount.innerText = discount.description;
        const addButton = document.createElement('button');
        addButton.innerText = 'ADD';
        addButton.className = discount.promoCode;
        promoCode.appendChild(addDiscount);
        addDiscount.appendChild(addButton);
        addButton?.addEventListener('click', () => {
          addDiscont(discount);
        });
        const isAppliedDiscontExist = this.appliedDiscounts.find((disc) => disc.id === discount.id);
        if (isAppliedDiscontExist) {
          addButton.remove();
        }
      };

      inputSeachPromocod.addEventListener('input', (event: any) => {
        const currentInputValue = event.target.value.trim().toLowerCase();
        const currentDiscont = this.existDisconts.find((disc) => disc.promoCode === currentInputValue);
        if (currentDiscont) {
          createAddDiscountBlock(currentDiscont);
        } else {
          const addDiscount = document.querySelector('.add-discount');
          addDiscount?.remove();
        }
      });

      renderPromo();
      let itemNumberStart: number = 0;
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

        buttonPlus.addEventListener('click', () => {
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
            console.log(true);
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
          this.handleInputLimitValue();
        });
      });
    }
    this.handlePagination();
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

    if (inputLimitPage) {
      // inputLimitPage.type = 'number';
      inputLimitPage.min = '1';
      inputLimitPage.max = `${this.getLocalStorage()?.length}`;
      inputLimitPage.value = `${this.getLocalStorage()?.length}`;
    }
  }

  updateCartCatalog() {
    const cartProductsContainer = document.querySelector('.products-in-cart');
    const inputLimitPage: HTMLInputElement | null = document.querySelector('.limit-page__input');
    const cartProducts = this.getLocalStorage();
    const spanTotalProducts: HTMLSpanElement | null = document.querySelector('.total-products__item');
    const spanTotalPrice: HTMLSpanElement | null = document.querySelector('.span-total-price');
    const productsInCart: HTMLDivElement | null = document.querySelector('.products-in-cart');
    const summary: HTMLDivElement | null = document.querySelector('.summary');
    const parentDivCart: HTMLDivElement | null = document.querySelector('.parent-div-cart');

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
      let itemNumberStart: number = 0;
      for (let i = 0; i < +inputLimitPage.value; i += 1) {
        if (+inputLimitPage.value > cartProducts.length) {
          inputLimitPage.value = cartProducts.length.toString();
        }
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
        imgItem.src = `${cartProducts[i].thumbnail}`;
        itemInfo.appendChild(imgItem);
        const itemDetailProd: HTMLDivElement | null = document.createElement('div');
        itemDetailProd.className = 'item-detail-p';
        itemInfo.appendChild(itemDetailProd);
        const productTitle: HTMLDivElement | null = document.createElement('div');
        productTitle.className = 'product-title-cart';
        itemDetailProd.appendChild(productTitle);
        const nameProd: HTMLElement | null = document.createElement('h3');
        nameProd.innerText = `${cartProducts[i].title}`;
        productTitle.appendChild(nameProd);
        const productDescription: HTMLDivElement | null = document.createElement('div');
        productDescription.className = 'product-description';
        productDescription.innerText = `${cartProducts[i].description}`;
        itemDetailProd.appendChild(productDescription);
        const productOther: HTMLDivElement | null = document.createElement('div');
        productOther.className = 'product-other';
        itemDetailProd.appendChild(productOther);
        const productRaiting: HTMLDivElement | null = document.createElement('div');
        productRaiting.className = 'product-other-one-block';
        productRaiting.innerText = `Rating: ${cartProducts[i].rating}`;
        const productDiscount: HTMLDivElement | null = document.createElement('div');
        productDiscount.className = 'product-other-one-block';
        productDiscount.innerText = `Discount: ${cartProducts[i].discountPercentage}`;
        productOther.appendChild(productRaiting);
        productOther.appendChild(productDiscount);

        const numberControl: HTMLDivElement | null = document.createElement('div');
        numberControl.className = 'number-control';
        cartItem.appendChild(numberControl);
        const stockControl: HTMLDivElement | null = document.createElement('div');
        stockControl.className = 'stock-control';
        stockControl.innerText = `Stock: ${cartProducts[i].stock}`;
        numberControl.appendChild(stockControl);
        const incDecControl: HTMLDivElement | null = document.createElement('div');
        incDecControl.className = 'incDec-control';
        numberControl.appendChild(incDecControl);
        const buttonPlus: HTMLButtonElement | null = document.createElement('button');
        buttonPlus.className = 'button-stock';
        buttonPlus.innerText = '+';
        incDecControl.appendChild(buttonPlus);
        const spanStockCount: HTMLSpanElement | null = document.createElement('span');
        spanStockCount.innerText = `${cartProducts[i].stockSelect}`;
        incDecControl.appendChild(spanStockCount);
        const buttonMinus: HTMLButtonElement | null = document.createElement('button');
        buttonMinus.className = 'button-stock';
        buttonMinus.innerText = '-';
        incDecControl.appendChild(buttonMinus);
        const amountControl: HTMLDivElement | null = document.createElement('div');
        amountControl.className = 'amount-control';
        amountControl.innerText = `€ ${cartProducts[i].price}`;
        numberControl.appendChild(amountControl);

        let countStock: number = +spanStockCount.innerText;
        const headerPrice: HTMLSpanElement | null = document.querySelector('.header__price span');
        const headerCount: HTMLDivElement | null = document.querySelector('.header__cart__total');

        buttonPlus.addEventListener('click', () => {
          spanStockCount.innerText = `${++countStock}`;
          const updtedStockSelect = cartProducts.map((item: IProductData) => {
            if (item.id === cartProducts[i].id) {
              item.stockSelect = +spanStockCount.innerText;
              return item;
            } else {
              return item;
            }
          });
          localStorage.setItem('product-cart', `${JSON.stringify(updtedStockSelect)}`);

          const resultStorage: string | null = localStorage.getItem('result');
          if (resultStorage !== null) {
            const result = +resultStorage + cartProducts[i].price;
            headerPrice!.innerText = `Total Price: ${result}€`;
            const resultStorageLength: string | null = localStorage.getItem('storage-length');
            if (resultStorageLength !== null) {
              const resultLength = +resultStorageLength + 1;
              headerCount!.innerText = `${resultLength}`;
              spanTotalProducts.innerText = `Products: ${resultLength}`;
              spanTotalPrice.innerText = `Total: € ${result}`;
              localStorage.setItem('result', `${result}`);
              localStorage.setItem('storage-length', `${resultLength}`);
              if (+countStock === cartProducts[i].stock) {
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
            const result = +resultStorage - cartProducts[i].price;
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
                const isProductExist = productStorage.find((prod: IProductData) => prod.id === cartProducts[i]?.id);
                if (isProductExist) {
                  productStorage = productStorage.filter((item: IProductData) => item.id !== cartProducts[i]?.id);
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
            const updtedStockSelect = cartProducts.map((item: IProductData) => {
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
    if (inputLimitPage && productItems) {
      inputLimitPage.addEventListener('input', () => {
        this.clearCartCatalog();
        this.updateCartCatalog();
      });
    }
  }
}
