import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { cart, loadFromStorage } from '../../data/cart.js';

describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  // It is called 'Hook', a special function in Jasmine. Here we use hooks 'beforeEach'
  // This hook basically means we will run this beforeEach function first, and use this 
  // function on each 'it' block test. Basically to remove repeatable code so the code looks cleaner

  beforeEach(() => {
    //IT IS RECOMMENDED TO MOCK BOTH 'setItem' and 'getItem' to prevent localStorage data gets affected by the testing
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-check-out-header-middle-section"></div>
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
        }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
        }]);
    });

    loadFromStorage();

    renderOrderSummary();
  });

  afterEach(() => { // EXERCISE 16F
    //code below is to remove the generated HTML, just so we can see the test result more clearly
    //recommended to clear the generated html after every test
    //try commenting code below
    document.querySelector('.js-test-container').innerHTML = ``;
  })

  it('displays the cart', () => {
    expect(
      // this querySelectorAll gives an array of element.
      // since we will have 2 'js-cart-item-container'. we can use .length
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId1}`).innerText
    ).toContain('Black and Gray Athletic Cotton Socks - 6 Pairs');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerText
    ).toContain('$10.90');

    expect(
      document.querySelector(`.js-product-price-${productId2}`).innerText
    ).toContain('$20.95');

  });

  it('removes a product', () => {
    // to check if the delete is working by checking if js-cart-item-container only has
    // 1 item remaining (before 2, but now only 1)
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(
      // this querySelectorAll gives an array of element.
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    // this test making sure that the first product is deleted, by checking
    // js-cart-item-container-productId1 value is null
    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null)

    // this test making sure that product2 is still on the cart and only product1 is deleted.
    // READ NOTES BELOW
    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null)

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Intermediate Size Basketball');

    // This is to check after deleting product1, the cart is also updated not just the page
    // before cart has 2 products, now after deleting product1, cart.lenght should equal to 1
    expect(cart.length).toEqual(1);

    // in the test before, we delete product1, so product2 should be in the first array of cart
    expect(cart[0].productId).toEqual(productId2);
  });

  it('updates delivery option', () => {
    // check by clicking the 3rd delivery option 
    document.querySelector(`.js-delivery-option-input-${productId1}-3`).click();
    expect(
      document.querySelector(`.js-delivery-option-input-${productId1}-3`).checked
    ).toEqual(true);

    // check if the cart length is still correct
    expect(cart.length).toEqual(2);

    // check if the first product is still product1
    expect(cart[0].productId).toEqual(productId1);

    // check if product1 delivery option is updated from 1st option to 3rd option
    expect(cart[0].deliveryOptionId).toEqual('3');

    // check if shipping price and total price changes correctly
    expect(
      document.querySelector('.js-total-shipping-cost').innerText
    ).toEqual('$14.98');

    expect(
      document.querySelector('.js-total-order-cost').innerText
    ).toEqual('$63.50');
  })
});




/*
In Jasmine, expect has a property 'not', it basically works like '!'
which is to check the opposite */