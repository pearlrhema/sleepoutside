
// const checkoutprocess = items : [] 

// export default class CheckoutProcess{
//     constructor(){}

//     calculateSubtotal(){
//         return this.items.reduce((total-item)=> total+(item.price*item))
//     }
// }

function outerFunction(x) {
    let innerVar = x * 2;
    
    function innerFunction(y) {
      return innerVar + y;
    }
  
    return innerFunction;
  }
  
  let closure = outerFunction(5);
  console.log(closure(3));
