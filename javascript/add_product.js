// DOM
const addProductForm = document.querySelector('#add-product-form');
const titleInput = document.querySelector('#title-input');
const priceInput = document.querySelector('#price-input');
const imageUrlInput = document.querySelector('#image-url-input');
const descriptionInput = document.querySelector('#description-input');
const addProductButton = document.querySelector('#add-product-btn');



// functions
const user = Utils.getUserFromUrl();
const currentProduct = Utils.getProductFromUrl();

function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function addProduct() {
    const product = new Product(undefined, titleInput.value, priceInput.value,  imageUrlInput.value, descriptionInput.value);
    StoreService.addProduct(product, user);
    window.location.replace(`./my_products.html?id=${user.id}`);
}

function populateInputsWithCurrentProduct() {
    titleInput.value = currentProduct.title;
    priceInput.value = currentProduct.price;
    imageUrlInput.value = currentProduct.imageUrl;
    descriptionInput.value = currentProduct.description;
}

function editProduct() {
    const editiedProduct = new Product(currentProduct.id, titleInput.value, priceInput.value,  imageUrlInput.value, descriptionInput.value);
    StoreService.editProduct(editiedProduct, user);
    window.location.replace(`./my_products.html?id=${user.id}`);
}


// event listeners
document.addEventListener('DOMContentLoaded', e => {
    buildNavBar();
    if (currentProduct) {
        populateInputsWithCurrentProduct();
        addProductButton.textContent = 'Edit Product';
    }
});

addProductForm.addEventListener('submit', e => {
    e.preventDefault();
    if (currentProduct)
        editProduct();
    else
        addProduct();
});
