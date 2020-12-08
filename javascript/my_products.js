// DOM
const productsList = document.querySelector('#my-products-products-list');
const addProductButton = document.querySelector('#add-product-btn');


// functions
let user = Utils.getUserFromUrl();
let userProducts = StoreService.getUserProducts(user.products);

function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function DrawUserProducts(refresh = false) {
    if (refresh) {
        user = Utils.getUserFromUrl();
        userProducts = StoreService.getUserProducts(user.products);
    }
    userProducts.forEach(product => {
        productsList.appendChild(UI.buildProductView(product, 'my-products'));
    });
}

buildNavBar();
DrawUserProducts();

function removeProduct(e) {
    const product = Utils.getProductFromEvent(e);
    StoreService.removeProduct(product.id, user);
    Utils.removeProductFromUI(e);
}

function editProduct(e) {
    window.location.assign(`./add_product.html?id=${user.id}&prodId=${Utils.getProductFromEvent(e).id}`);
}


// event listeners
addProductButton.addEventListener('click', e => {
    window.location.href = (`./add_product.html?id=${user.id}`);
});
Utils.addEventToButtons('edit-product-btn', editProduct);
Utils.addEventToButtons('remove-from-my-products-btn', removeProduct);


