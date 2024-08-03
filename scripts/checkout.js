import { cart, removeFromCart, calculateCartQuantity, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


let cartSumarryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if(product.id === productId){
      matchingProduct = product
    }
  });

  cartSumarryHTML += 
  `
    <div class="js-cart-item-container-${matchingProduct.id} cart-item-container">
      <div class="delivery-date">
        Delivery date: Wednesday, June 15
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
            <input class="js-quantity-input-${matchingProduct.id} quantity-input" type="number" value="${cartItem.quantity}" data-product-id="${matchingProduct.id}">
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

          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" checked class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio" class="delivery-option-input"
              name="delivery-option-${matchingProduct.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
});

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

// function handleSave(productId){
//   const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
//   const newQuantity = Number(quantityInput);

//   updateQuantity(productId, newQuantity);

//   document.querySelector(`.js-quantity-label-${productId}`)
//     .innerHTML = newQuantity;

//   updateCartQuantity();

//   document.querySelector(`.js-quantity-item-container-${productId}`)
//     .classList.remove('is-editing-quantity');
// }

document.querySelectorAll('.js-save-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      console.log(link);
      const productId = link.dataset.productId;
      const quantityInput = document.querySelector(`.js-quantity-input-${productId}`).value;
      const newQuantity = Number(quantityInput);
      
      updateQuantity(productId, newQuantity);
  
      document.querySelector(`.js-quantity-label-${productId}`)
        .innerHTML = newQuantity;
  
      updateCartQuantity();
  
      document.querySelector(`.js-cart-item-container-${productId}`)
        .classList.remove('is-editing-quantity');
    })
  });

document.querySelectorAll(`.js-quantity-input`)
  .forEach((input) => {
    input.addEventListener('keydown', (event) => {
      if(event.key === 'Enter'){
        const productId = input.dataset.productId;
        const quantityInput = input.value;
        const newQuantity = Number(quantityInput);
        
        updateQuantity(productId, newQuantity);
    
        document.querySelector(`.js-quantity-label-${productId}`)
          .innerHTML = newQuantity;
    
        updateCartQuantity();
    
        document.querySelector(`.js-cart-item-container-${productId}`)
          .classList.remove('is-editing-quantity');
      }
    });
  });

updateCartQuantity();

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity()

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
} 
  