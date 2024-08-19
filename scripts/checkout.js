import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
// import '../data/cart-class.js'; this import is for the class practice 
import '../data/car.js'; // this is for exercise
// import '../data/backend-practice.js'; this is practice file
import { loadProducts } from '../data/products.js';
import { loadCart } from '../data/cart.js';


Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('value 1');
    });
  }), 

  new Promise((resolve) => {
    loadCart(() => {
      resolve('aloha');
    });
  })
]).then((values) => {
  console.log(values)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value 1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
})
*/