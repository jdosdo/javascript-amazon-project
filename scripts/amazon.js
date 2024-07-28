

//First make a variable to saves all the products in the list. Make it an empty string first
let productsHTML = '';

// We need to generate all the products using loop (forEach()).
// Variable productsHTML will do the job here.
// Each time it loops, each product HTML will be added to to this productsHTML (hence the productsHTML+= ``)
// This technique called Accumulator Pattern
products.forEach((product) => {
  productsHTML+= `
    <div class="product-container">
      <div class="product-image-container">
        <img class="product-image"
          src="${product.image}">
      </div>

      <div class="product-name limit-text-to-2-lines">
        ${product.name}
      </div>

      <div class="product-rating-container">
        <img class="product-rating-stars"
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
      </div>

      <div class="product-quantity-container">
        <select>
          <option selected value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
      </div>

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="js-add-to-cart add-to-cart-button button-primary" data-product-id="${product.id}">
        Add to Cart
      </button>
    </div>
  `;

});


document.querySelector('.js-products-grid')
  .innerHTML = productsHTML;

document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      let matchingItem;

      cart.forEach((item) => {
        // Check if the added product is already exist in a cart. we check item.productName because in
        // item it also has quantity. Check console.log(item);
        if(productId === item.productId){
          matchingItem = item; // if match, store it into a variable called matchingItem. This variable is an object, as 'item' is an object
        }
      });

      if(matchingItem){
        matchingItem.quantity += 1;
      } else{
        cart.push({
          productId: productId,
          quantity: 1
        });
      }
      console.log(cart);
    })
  });

/*
NOTES
-- method toFixed() will convert the numbers into string
*/