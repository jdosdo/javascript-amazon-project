export const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
},{
  id: '2',
  deliveryDays: 3,
  priceCents: 499
},{
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    };
  });

  return deliveryOption || deliveryOption[0];
  // to be save we give deliveryOption a default value to return
  // which is deliveryOption[0]. Which is an array of delivery option
  // [0] means first index, which is in this case is id: '1'
}