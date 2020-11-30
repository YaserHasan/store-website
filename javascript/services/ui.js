class UI {
  static buildNavBar(userId) {
    console.log(userId);
    // create nav
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <div id="nav-bar" class="container">
      <a href="../pages/store.html?id=${userId}"><h1>My Store</h1></a>
      <ul id="nav-links">
        <li><a class="nav-link" href="../pages/store.html?id=${userId}">Store</a></li>
        <li><a class="nav-link" href="../pages/cart.html?id=${userId}">Cart</a></li>
        <li><a class="nav-link" href="../pages/my_products.html?id=${userId}">My Products</a></li>
      </ul>
    </div>
    `;
    return nav;
  }

  static buildAuthNavBar() {
    const nav = document.createElement('nav');
      nav.innerHTML = `
        <div id="nav-bar" class="container">
        <h1 id="auth-nav-h1">My Store</h1>
      </div>
      `;
      return nav;
  }

  static buildProductView(product, productPlace) {
    // create li
    const prodLi = document.createElement('li');
    prodLi.className = 'product';
    prodLi.innerHTML = `
      <div class="product-details">
        <img src="${product.imageUrl}" alt="${product.title}">
        <h2>${product.title}</h2>
      </div>
      <div class="product-actions">
        <h3>${product.price}&#8362;</h3>
        ${this.#buildProductButtons(productPlace)}
      </div>
    `;
    return prodLi;
  }

  static #buildProductButtons(productPlace) {
    switch(productPlace) {
      case 'store':
        return '<button id="add-to-cart-btn" class="btn btn-cta">Add to cart</button>';

        case 'cart':
          return '<button id="remove-from-cart-btn" class="btn">Remove</button>';

      case 'my-products':
        return `
          <button id="edit-product-btn" class="btn btn-cta">Edit</button>
          <button id="remove-from-my-products-btn" class="btn">Remove</button>
        `;

      default:
          return '';
    }
  }

}
