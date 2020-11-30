class Product {
    constructor(id = Utils.generateId(), title, price, imageUrl, description) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
    }

    toJson() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            imageUrl: this.imageUrl,
            description: this.description,
        };
    }

    static fromJson(json) {
        return new Product(
            json.id,
            json.title,
            json.price,
            json.imageUrl,
            json.description,
        );
    }
}