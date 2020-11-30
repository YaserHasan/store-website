// DOM
const productsList = document.querySelector('.products-list');
const itemsCost = document.querySelector('#items-cost');
const taxes = document.querySelector('#taxes');
const total = document.querySelector('#total');


// functions
const user = Utils.getUserFromUrl();
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
    if (refresh) userCart = StoreService.getUserCart(user.cart);
    let productsCost = 0;
    userCart.forEach(product => {
        productsCost += product.price;
    });
    itemsCost.textContent = Math.floor(productsCost);
    taxes.textContent = Math.floor(productsCost * 0.17);
    total.textContent = Math.floor(((productsCost * 0.17) + productsCost));
}



// event listeners
document.addEventListener('DOMContentLoaded', e => {
    buildNavBar();
    DrawUserCartProducts();
    getPrices();
});

document.querySelectorAll('#remove-from-cart-btn').forEach(btn => btn.addEventListener('click', e => {
    removeProductFromCart(e);
    getPrices(true);
}));