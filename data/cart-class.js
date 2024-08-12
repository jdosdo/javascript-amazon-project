class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey){
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  //this code is the same as a shorthand syntax below
  //loadFromStorage: function(){} CANT USE ARROW FUNCTION TO MAKE METHOD(function inside object)
  
  loadFromStorage(){
    this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey));
    
    if(!this.cartItems){
      this.cartItems = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
        }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '2'
        }];
    };
  };

  saveToStorage(){
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
  };

  addToCart(productId, selectedValue){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      // Check if the added product is already exist in a cart. we check item.productName because in
      // item it also has quantity. Check console.log(item);
      if(productId === cartItem.productId){
        matchingItem = cartItem; // if match, store it into a variable called matchingItem. This variable is an object, as 'item' is an object
      };
    });
  
    if(matchingItem){
      matchingItem.quantity += selectedValue;
    } else{
      this.cartItems.push({
        productId: productId,
        quantity: selectedValue,
        deliveryOptionId: '1'
      });
    };
  
    this.saveToStorage();
  };

  removeFromCart(productId){
    const newCart = [];
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId !== productId){
        newCart.push(cartItem);
      };
    });
  
    this.cartItems = newCart;
    this.saveToStorage();
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;
    let checkDeliveryOptionId = Number(deliveryOptionId)
  
    if(checkDeliveryOptionId < 1 || checkDeliveryOptionId > 3){
      return;
    }
  
    this.cartItems.forEach((cartItem) => {
      if(productId === cartItem.productId){
        matchingItem = cartItem; 
      }
    });
    
    // check if the productId inputed to this function exists in the cart
    // if doesnt exists then immediately end the function
    if(!matchingItem){
      return;
    };
    
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  };

  calculateCartQuantity(){
    let cartQuantity = 0;
  
    this.cartItems.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
  
    return cartQuantity;
  };

  updateQuantity(productId, newQuantity){
    let matchingItem;
  
    this.cartItems.forEach((cartItem) => {
      if(cartItem.productId === productId){
        matchingItem = cartItem;
      };
    });
  
    matchingItem.quantity = newQuantity;
    this.saveToStorage();
  };
}

// these 2, an object created from Class, is called instance
const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');


console.log(cart);
console.log(businessCart);

// code below is to check if businessCart is an object created from class Cart
console.log(businessCart instanceof Cart); // output : true

