class User {
    constructor(id, email, cart, products) {
        this.id = id;
        this.email = email;
        this.cart = cart;
        this.products = products;
    }

    toJson() {
        return {
            id: this.id,
            email: this.email,
            cart: this.cart,
            products: this.products,
        };
    }

    static fromJson(json) {
       return new User(
            json.id,
            json.email,
            json.cart,
            json.products,
        );
    }

}