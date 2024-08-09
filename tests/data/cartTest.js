import { cart, addToCart, loadFromStorage, removeFromCart } from '../../data/cart.js'

describe('test suite: addToCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
  }); //THIS IS EXERCISE 16E

  it('adds an existing product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: '1'
    }])); //THIS IS EXERCISE 16C
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(2);
    
  });

  it('adds a new product to the cart', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d', 1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '1'
    }])); // THIS IS EXERCISE 16D
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d')
    expect(cart[0].quantity).toEqual(1);
  });
})

describe('test suite: removeFromCart', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();
  });

  it('remove a productId that is in the cart', () => {
  
    // use delete function to delete product1
    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    // check if there is only 1 product left on cart
    expect(cart.length).toEqual(1);

    // check cart[0] if has productId= product2Id, becasue product1 already deleted
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');

    // check if localStorage.setItem have been called exactly 1 time
    expect(localStorage.setItem).toHaveBeenCalledTimes(1)

    // check if localStorage.setItem have been called with correct values
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2,
      deliveryOptionId: '1'
    }]))
  })

  it('wont do anything when non-existent productId inputed', () => {
    
    //get current cart length
    const currentCartLength = cart.length

    // use delete function using non-existent productId
    removeFromCart('this-is-non-existent-id')

    // check if cart length is changed
    expect(cart.length).toEqual(currentCartLength);

    // check if the item in the cart changed. we check cart[0]
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);

    //check if localStorage.setItem not have been called 1 times
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    //check if localStorage.setItem still has correct values
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '1'
    }]))
  });
  
})