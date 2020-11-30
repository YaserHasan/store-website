// DOM
const titleInput = document.querySelector('#title-input');
const priceInput = document.querySelector('#price-input');
const imageUrlInput = document.querySelector('#image-url-input');
const descriptionInput = document.querySelector('#description-input');
const addProductButton = document.querySelector('#add-product-btn');



// functions
const user = Utils.getUserFromUrl();


function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function addProduct() {
    const product = new Product(undefined, titleInput.value, priceInput.value,  imageUrlInput.value, descriptionInput.value);
    StoreService.addProduct(product, user);
    window.location.replace(`../pages/my_products.html?id=${user.id}`);
}


// event listeners
document.addEventListener('DOMContentLoaded', e => {
    buildNavBar();
});

addProductButton.addEventListener('click', e => {
    e.preventDefault();
    addProduct();
});
