import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'

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

export function calculateDeliveryDate(deliveryOption){
  let deliveryDate = dayjs();
  let remainingDays = deliveryOption.deliveryDays;

  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1, 'days')
    if(!isWeekend(deliveryDate)){
      remainingDays--
    }
  }

  const dateString = deliveryDate.format('dddd, MMMM D')
  return dateString;
}

function isWeekend(date){
  const dayOfWeek = date.format('dddd')
  return dayOfWeek === 'Saturday' || dayOfWeek === 'Sunday'
};

// function skipWeekend(getDay, deliveryOption){
//   let finalDeliveryDays = 0;

//   let days = deliveryOption.deliveryDays;

//   while(days > 0){
//     let dayString = getDay.format('dddd');
//     if(dayString === 'Saturday' || dayString === 'Sunday'){
//       finalDeliveryDays += 1;
//       getDay = getDay.add(1, 'days'); // ALWAYS REMEMBER, IF ADDING SOMETHING ALWAYS USE a = a+1;
//       continue;
//     }
//     finalDeliveryDays += 1;
//     getDay = getDay.add(1, 'days');
//     days--;
//   }
//   return finalDeliveryDays;
// }


