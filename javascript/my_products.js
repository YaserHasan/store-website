// DOM
const productsList = document.querySelector('#my-products-products-list');
const addProductBtnAnchor = document.querySelector('#add-product-anchor');


// functions
const user = Utils.getUserFromUrl();
let userProducts = StoreService.getUserProducts(user.products);

function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function DrawUserProducts() {
    userProducts.forEach(product => {
        productsList.appendChild(UI.buildProductView(product, 'my-products'));
    });
}

// event listeners
document.addEventListener('DOMContentLoaded', e => {
    addProductBtnAnchor.href = `../pages/add-product.html?id=${user.id}`;
    buildNavBar();
    DrawUserProducts();
});


