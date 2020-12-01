// DOM
const productsList = document.querySelector('.products-list');
const itemsCost = document.querySelector('#items-cost');
const taxes = document.querySelector('#taxes');
const total = document.querySelector('#total');


// functions
let user = Utils.getUserFromUrl();
let userCart = StoreService.getUserCart(user.cart);

function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function DrawUserCartProducts() {
    userCart.forEach(product => {
        productsList.appendChild(UI.buildProductView(product, 'cart'));
    });
}

// get the prices
function getPrices(refresh = false) {
    if (refresh) {
        user = Utils.getUserFromUrl();
        userCart = StoreService.getUserCart(user.cart);
    }
    let productsCost = 0;
    userCart.forEach(product => {
        productsCost += product.price;
    });
    itemsCost.textContent = Math.floor(productsCost);
    taxes.textContent = Math.floor(productsCost * 0.17);
    total.textContent = Math.floor(((productsCost * 0.17) + productsCost));
}

buildNavBar();
DrawUserCartProducts();
getPrices();

function removeProductFromCart(e) {
    const product = Utils.getProductFromEvent(e);
    AuthService.removeProductfromUserCart(user.id, product.id);
    Utils.removeProductFromUI(e);
    getPrices(true);
}


// event listeners
Utils.addEventToButtons('remove-from-cart-btn', removeProductFromCart);