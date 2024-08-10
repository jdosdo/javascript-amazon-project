import { cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js'

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
});

describe('test suite: updateDeliveryOption', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');
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
  })

  it('updates the delivery option of a product in a cart', () => {
    //changes deliveryOptionId of product1 from '1' to '3'
    updateDeliveryOption(productId1, '3');

    //check if there is any changes of total products in a cart
    expect(cart.length).toEqual(2);

    //check if updated object (in this case, cart[0]), still has correct value
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);

    // check if deliveryOptionId of product1 is changed to '3'
    expect(cart[0].deliveryOptionId).toEqual('3');

    // check if localStorage.setItem is called 1 time
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    // check if the cart looks okay (in this case exactly like on spy but
    // deliveryOptionId of product1 should be '3' instead of '1');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 2,
      deliveryOptionId: '3'
      }, {
      productId: productId2,
      quantity: 1,
      deliveryOptionId: '2'
    }]));
  });

  it('wont do anything if productId isnt exists in the cart', () => {
    updateDeliveryOption('non-existent-id', '3');

    //check if cart length is still the same
    expect(cart.length).toEqual(2);

    //check if first product in the cart is still the same
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
    expect(cart[0].deliveryOptionId).toEqual('1');


    // check if localStorage.setItem is never been called (since we make a check)
    // on updateDeliveryOption to return nothing if we input non-existent productId
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('wont do anything if deliveryOptionId inputed doesnt exist', () => {
    updateDeliveryOption(productId1, '5');

    // check if cart length remains the same
    expect(cart.length).toEqual(2);

    // check if there is no changes on the product1 details
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);

    // since we give 5 as deliveryOption, check if deliveryOptionId is changed
    expect(cart[0].deliveryOptionId).not.toEqual('5')
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  })
});