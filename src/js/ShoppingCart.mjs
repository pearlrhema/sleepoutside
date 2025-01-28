import { getLocalStorage } from "./utils.mjs";

function cartItemTemplate(item){
    return `<li class="cart-card divider">
        <a href="#" class="cart-card__image">
        <img
            src="${item.Image}"
            alt="Image of ${item.Name}"
        />
        <a href="#">
            <h2 class="card__name">${item.Name}</h2>
        </a>
        <p class="cart-card__color">${item.Colors[0].ColorName}</p>
        <p class="cart-card__quantity">qty: 1</p>
        <p class="cart-card__price">$${item.FinalPrice}</p>
        </li>
        `
}

function calculateTotalPrice(cartItems, selector) {
    if (cartItems !== null) {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        document.querySelector(selector).innerHTML = htmlItems.join('');
    }
    return cartItems.reduce((total, item) => total + item.FinalPrice, 0);
}


export default class ShoppingCart{
    constructor(key, parentSelector){
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents(){
      const cartItems = getLocalStorage(this.key);
        if (cartItems !== null) {
            const htmlItems = cartItems.map((item) => cartItemTemplate(item));
            document.querySelector(this.parentSelector).innerHTML = htmlItems.join('');
        } 

        const cartFooter = document.querySelector('.cart-footer');
        // To show the footer, remove the 'hide' class
        cartFooter.classList.remove('hide');
        
        
        // Calculate the total price
        const totalPrice = calculateTotalPrice(cartItems, this.parentSelector);
        
        // Update the cart total
        const cartTotalElement = document.querySelector('.cart-total');
        cartTotalElement.textContent = `Total: $${totalPrice.toFixed(2)}`;  
    }
}
