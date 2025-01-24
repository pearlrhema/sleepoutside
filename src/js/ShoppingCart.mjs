// import { getLocalStorage } from "./utils.mjs";

// function cartItemTemplate(item){
//     return `<li class="cart-card divider">
//         <a href="#" class="cart-card__image">
//         <img
//             src="${item.Image}"
//             alt="Image of ${item.Name}"
//         />
//         <a href="#">
//             <h2 class="card__name">${item.Name}</h2>
//         </a>
//         <p class="cart-card__color">${item.Colors[0].ColorName}</p>
//         <p class="cart-card__quantity">qty: 1</p>
//         <p class="cart-card__price">$${item.FinalPrice}</p>
//         </li>
//         `
// }


// export default class ShoppingCart{
//     constructor(key, parentSelector){
//         this.key = key;
//         this.parentSelector = parentSelector;
//     }

//     renderCartContents(){
//       const cartItems = getLocalStorage(this.key);
//       const htmlItems = cartItems.map((item) => cartItemTemplate(item));
//       document.querySelector(this.parentSelector).innerHTML = htmlItems.join("");
//     }
// }

//--------code to add the remove button feature---------
// import { getLocalStorage, setLocalStorage } from "./utils.mjs";

// function cartItemTemplate(item, index) {
//     return `
//     <li class="cart-card divider" data-index="${index}">
//         <a href="#" class="cart-card__image">
//             <img src="${item.Image}" alt="Image of ${item.Name}" />
//         </a>
//         <div class="cart-card__details">
//             <h2 class="card__name">${item.Name}</h2>
//             <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color specified"}</p>
//             <p class="cart-card__quantity">qty: 1</p>
//             <p class="cart-card__price">$${item.FinalPrice}</p>
//             <button class="removeButtons" data-index="${index}">Remove Item</button>
//         </div>
//     </li>`;
// }

// export default class ShoppingCart {
//     constructor(key, parentSelector) {
//         this.key = key;
//         this.parentSelector = parentSelector;
//     }

//     renderCartContents() {
//         // Fetch cart items from local storage
//         const cartItems = getLocalStorage(this.key) || [];
//         if (cartItems.length === 0) {
//             this.displayEmptyCartMessage();
//             return;
//         }

//         // Generate HTML for cart items
//         const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
//         const cartContainer = document.querySelector(this.parentSelector);
//         cartContainer.innerHTML = htmlItems.join("");

//         // Attach event listeners for "Remove Item" buttons
//         this.attachRemoveItemListeners(cartItems);
//     }

//     attachRemoveItemListeners(cartItems) {
//         const cartContainer = document.querySelector(this.parentSelector);
//         const removeButtons = cartContainer.querySelectorAll(".removeButtons");

//         removeButtons.forEach((button) => {
//             button.addEventListener("click", (event) => {
//                 const index = event.target.getAttribute("data-index");
//                 cartItems.splice(index, 1); // Remove item from the array
//                 setLocalStorage(this.key, cartItems); // Update local storage
//                 this.renderCartContents(); // Re-render cart
//             });
//         });
//     }

//     displayEmptyCartMessage() {
//         const cartContainer = document.querySelector(this.parentSelector);
//         cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
//     }
// }

//--------------REPLACE THE REMOVE BUTTON WITH AND X---------------
import { getLocalStorage } from "./utils.mjs";
function cartItemTemplate(item, index) {
    return `
    <li class="cart-card divider" data-index="${index}" style="position: relative;">
        <button class="removeButton" data-index="${index}" style="position: absolute; top: 8px; right: 8px; background: transparent; border: none; font-size: 1.2rem; cursor: pointer;">&times;</button>
        <a href="#" class="cart-card__image">
            <img src="${item.Image}" alt="Image of ${item.Name}" />
        </a>
        <div class="cart-card__details">
            <h2 class="card__name">${item.Name}</h2>
            <p class="cart-card__color">${item.Colors?.[0]?.ColorName || "No color specified"}</p>
            <p class="cart-card__quantity">qty: 1</p>
            <p class="cart-card__price">$${item.FinalPrice}</p>
        </div>
    </li>`;
}

export default class ShoppingCart {
    constructor(key, parentSelector) {
        this.key = key;
        this.parentSelector = parentSelector;
    }

    renderCartContents() {
        const cartItems = getLocalStorage(this.key) || [];
        if (cartItems.length === 0) {
            this.displayEmptyCartMessage();
            return;
        }

        const htmlItems = cartItems.map((item, index) => cartItemTemplate(item, index));
        const cartContainer = document.querySelector(this.parentSelector);
        cartContainer.innerHTML = htmlItems.join("");

        this.attachRemoveItemListeners(cartItems);
    }

    attachRemoveItemListeners(cartItems) {
        const cartContainer = document.querySelector(this.parentSelector);
        const removeButtons = cartContainer.querySelectorAll(".removeButton");

        removeButtons.forEach((button) => {
            button.addEventListener("click", (event) => {
                const index = event.target.getAttribute("data-index");
                cartItems.splice(index, 1);
                setLocalStorage(this.key, cartItems);
                this.renderCartContents();
            });
        });
    }

    displayEmptyCartMessage() {
        const cartContainer = document.querySelector(this.parentSelector);
        cartContainer.innerHTML = `<p>Your cart is empty.</p>`;
    }
}

