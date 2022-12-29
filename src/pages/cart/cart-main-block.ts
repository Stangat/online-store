import './cart.scss';
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
      })
    } else {
      console.log(arrayProductsSelect)
      const productsInCart = document.createElement('div')
      productsInCart.className = ('products-in-cart')
      const summary = document.createElement('div')
      summary.className = ('summary')
      parentDivCart.appendChild(productsInCart)
      parentDivCart.appendChild(summary)
    }

  }
}
