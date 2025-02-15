import { setLocalStorage, getLocalStorage } from "./utils.mjs";

function productDetailsTemplate(product) {
  return `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.NameWithoutBrand}"
    />
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div></section>`;
}

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }

  addToCart() {
    let cart = getLocalStorage("so-cart") || [];

    // Check if product already exists in cart
    const existingProduct = cart.find(item => item.Id === this.product.Id);
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 1) + 1;
    } else {
      this.product.quantity = 1;
      cart.push(this.product);
    }

    setLocalStorage("so-cart", cart);
    this.updateCartIcon(cart);
    alert(`${this.product.NameWithoutBrand} has been added to your cart.`);
  }

  updateCartIcon(cart) {
    const cartCountElement = document.querySelector(".cart-count");
    if (cartCountElement) {
      const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
      cartCountElement.textContent = totalItems > 0 ? totalItems : "";
    }
  }

  renderProductDetails(selector) {
    const element = document.querySelector(selector);
    element.insertAdjacentHTML(
      "afterBegin",
      productDetailsTemplate(this.product)
    );
  }
}
