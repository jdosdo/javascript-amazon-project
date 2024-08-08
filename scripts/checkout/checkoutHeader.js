import {calculateCartQuantity} from '../../data/cart.js'

export function renderCheckoutHeader(){
  const cartQuantity = calculateCartQuantity();
  let checkOutHeaderHTML = `
      Checkout (<a class="js-return-to-home-link return-to-home-link"
        href="amazon.html">${cartQuantity} items</a>)
  `
  document.querySelector('.js-check-out-header-middle-section')
    .innerHTML = checkOutHeaderHTML;

}