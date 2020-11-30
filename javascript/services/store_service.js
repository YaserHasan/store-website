class StoreService {
    static addProduct(product, user) {
        let data;
        const currentData = localStorage.getItem('products');
        if (currentData) {
            data = JSON.parse(currentData);
            data.data.push(product.toJson());
        } else {
            data = {data: [ product.toJson() ]};
        }

        localStorage.setItem('products', JSON.stringify(data));
        AuthService.addProductToUserProducts(user.id, product.id);
    }

    static removeProduct(productId, user) {
        let data;
        const currentData = localStorage.getItem('products');
        if (currentData) {
            data = JSON.parse(currentData);
            data.data = data.data.filter(prod => prod.id !== product.id);
            localStorage.setItem('products', JSON.stringify(data));
            AuthService.removeProductfromUserProducts(user.id, productId);
        }
    }

    static getAllProducts() {
        let data = localStorage.getItem('products');
        if (data) {
            data = JSON.parse(data).data;
            data = data.map(productJson => Product.fromJson(productJson));
            return data;
        }
        return [];
    }

    static searchProducts(searchTerm) {
        const allProducts = this.getAllProducts();
        const filteredProducts = allProducts.filter(product => (product.title.includes(searchTerm) || product.description.includes(searchTerm)));
        return filteredProducts;
    }

    static getUserCart(userCart) {
        const allProducts = this.getAllProducts();
        const userCartItems = allProducts.filter(product => userCart.includes(product.id));
        return userCartItems;
    }

    static getUserProducts(userProducts) {
        const allProducts = this.getAllProducts();
        const userProductsItems = allProducts.filter(product => userProducts.includes(product.id));
        return userProductsItems;
    }

}