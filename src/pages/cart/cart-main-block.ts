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
    console.log(arrayProductsSelect?.length);
    if (arrayProductsSelect?.length === 0) {
      parentDivCart?.appendChild(emptyCart);
      parentDivCart?.appendChild(emptyCartButton);
      emptyCartButton.addEventListener('click', () => {
        window.location.href = '/';
      });
    }
    console.log(arrayProductsSelect);
  }
}
