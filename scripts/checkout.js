import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'
import { deliveryOptions } from '../data/deliveryOptions.js'

hello();
const today = dayjs();
const deliveryDate = today.add(7, 'days');

console.log(deliveryDate.format('dddd, MMMM D'));


let cartSumarryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'days'
  );
  const dateString = deliveryDate.format('dddd, MMMM D') // check dayjs documentation for .format() syntax

  cartSumarryHTML += 
  `
    <div class="js-cart-item-container-${matchingProduct.id} cart-item-container">
      <div class="delivery-date">
        Delivery date: ${dateString}
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingProduct.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            $${formatCurrency(matchingProduct.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="js-quantity-label-${matchingProduct.id} quantity-label">${cartItem.quantity}</span>
            </span>
            <span class="js-update-link update-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Update
            </span>
            <input class="js-quantity-input-${matchingProduct.id} js-quantity-input quantity-input" type="number" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
            <span class="js-save-link save-quantity-link link-primary" data-product-id="${matchingProduct.id}">Save</span>
            <span class="js-delete-link delete-quantity-link link-primary" data-product-id="${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = ''

  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D') // check dayjs documentation for .format() syntax

    const priceString = deliveryOption.priceCents === 0
      ? 'FREE'
      : `$${formatCurrency(deliveryOption.priceCents)} -`
    
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `
  });

  return html;
}

document.querySelector('.js-order-summary')
  .innerHTML = cartSumarryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () =>{
      const productId = link.dataset.productId
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();
      updateCartQuantity();
    });
  });

document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click' , () => {
      const productId = link.dataset.productId;
      
      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.add('is-editing-quantity')
    });
  });

function handleSave(productId){
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
  const newQuantity = Number(quantityInput);

  if(newQuantity > 0 && newQuantity < 1000){
    updateQuantity(productId, newQuantity);

    document.querySelector(`.js-quantity-label-${productId}`)
    .innerHTML = newQuantity;

    document.querySelector(`.js-cart-item-container-${productId}`)
    .classList.remove('is-editing-quantity');
  }
  else if(newQuantity === 0){
    removeFromCart(productId);
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    /* while based on this code variable container will always
    get the value of js-cart-item-container-${productId}, it is always best practice to 
    check if the container is there (truthy value), hence the 'if' below */
    if(container){ 
      container.remove();
    }
    updateCartQuantity();
  }
  else{
    alert('Please input valid value');
    return;
  }
  updateCartQuantity();
}

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    const productId = link.dataset.productId
    link.addEventListener('click', () =>handleSave(productId));
  });

document.querySelectorAll(`.js-quantity-input`)
  .forEach((input) => {
    const productId = input.dataset.productId;
    input.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        handleSave(productId);
      }
    });
  });

updateCartQuantity();

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity()

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
} 

document.querySelectorAll('.js-delivery-option')
  .forEach((element) => {
    element.addEventListener('click', () => {
      const {productId, deliveryOptionId} = element.dataset; 
      /*above is a shorthand property. example const productId = element.dataset.productId
      this shorthand property is possible if the variable we want to create has the same name
      as, in this case, the variable in dataset*/ 
      updateDeliveryOption(productId, deliveryOptionId)
    })
  })
  