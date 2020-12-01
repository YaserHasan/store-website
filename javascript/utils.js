class Utils {
    static generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    static getUserFromUrl() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const userId = url.searchParams.get('id');
        return AuthService.getUserById(userId);
    }

    static getProductFromUrl() {
        const url_string = window.location.href;
        const url = new URL(url_string);
        const productId = url.searchParams.get('prodId');
        return StoreService.getProductById(productId);
    }

    static addEventToButtons(buttonId, event) {
        document.querySelectorAll(`#${buttonId}`).forEach(button => {
            button.addEventListener('click', event);
        });
    }

    static #getProductElementFromEvent(e) {
        return e.target.parentElement.parentElement;
    }

    static getProductFromEvent(e) {
        const productId = this.#getProductElementFromEvent(e).querySelector('#product-id').textContent;
        const product = StoreService.getProductById(productId);
        return product;
    }

    static removeProductFromUI(e) {
        this.#getProductElementFromEvent(e).remove();
    }
}