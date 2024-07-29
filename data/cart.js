export const cart = [];

export function addToCart(productId){
  let matchingItem;

  cart.forEach((cartItem) => {
    // Check if the added product is already exist in a cart. we check item.productName because in
    // item it also has quantity. Check console.log(item);
    if(productId === cartItem.productId){
      matchingItem = cartItem; // if match, store it into a variable called matchingItem. This variable is an object, as 'item' is an object
    }
  });

  if(matchingItem){
    matchingItem.quantity += 1;
  } else{
    cart.push({
      productId: productId,
      quantity: 1
    });
  };
};