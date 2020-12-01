// DOM
const productsList = document.querySelector('.products-list');



// functions
let user = Utils.getUserFromUrl();

function buildNavBar() {
    document.querySelector('#nav-placeholder').replaceWith(UI.buildNavBar(user.id));
}

function getAndDrawAllProducts() {
    const products = StoreService.getAllProducts();
    console.log(products);
    products.forEach(product => {
        productsList.appendChild(UI.buildProductView(product, 'store'));
    });
}

buildNavBar();
getAndDrawAllProducts();

function addProductToCart(e) {
    const product = Utils.getProductFromEvent(e);
    if (AuthService.isProductInUserCart(product.id, user)) {
        alert('Product already in Cart!');
    } else {
        AuthService.addProductToUserCart(user.id, product.id);
        user = Utils.getUserFromUrl();
    }
    
}

// event listeners
Utils.addEventToButtons('add-to-cart-btn', addProductToCart);














// const { data: products } = JSON.parse('{"data":[{"title":"iPhone 11 Pro Max","price":5000,"imageUrl":"https://www.i-accs.ie/wp-content/uploads/2020/07/iphone-11-pro-max-gold-select-2019_GEO_EMEA-1.jpg"},{"title":"ASUS ROG Zephyrus S Gaming Laptop","price":11000,"imageUrl":"https://img-us1.asus.com/A/show/AW000706/2019/0126/AM0000009/201901AM260000009_15490692392002820033732.jpg"}]}');