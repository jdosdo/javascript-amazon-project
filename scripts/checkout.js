import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js'; this import is for the class practice 
import '../data/car.js'; // this is for exercise
// import '../data/backend-practice.js'; this is practice file
import { loadProducts } from '../data/products.js';

loadProducts(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})