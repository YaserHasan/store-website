class AuthService {
    static register(email, password) {
        // this functions return an array of two elements
        // the first element is a bollean value that indicates
        // if the proccess is completed, the second element is
        // string message
        const userData = {
            id: Utils.generateId(),
            email,
            password,
            cart: [],
            products: [],
        };

        let data;
        const currentData = localStorage.getItem('users');
        if (currentData) {
            data = JSON.parse(currentData);
            if (this.#isUserExists(data.data, email)[0]) {
                return [false, 'email aleady in use'];
            }
            data.data.push(userData);
        } else {
            data = { data: [userData] };
        }

        localStorage.setItem('users', JSON.stringify(data));
        return [true, 'successfully registered!, please login'];
    }

    static login(email, password) {
        let usersData = localStorage.getItem('users');
        if (!usersData) {
            return 'account not found!';
        } else {
            usersData = JSON.parse(usersData).data;
            const isUserExists = this.#isUserExists(usersData, email);
            if (isUserExists[0]) {
                if (isUserExists[1].password === password) {
                    return User.fromJson(isUserExists[1]);
                } else {
                    return 'Invalid Password!';
                }
            } else {
                return 'account not found!';
            }
        }
    }

    static #isUserExists(usersData, email) {
        // this function checks if user exists and return
        // array with a boolean value indicates if the user is exists,
        // and if the user exists then the second element of the array will
        // be the user data
        if (!usersData) return [false];
        for (var i = 0; i<usersData.length; i++) {
            if (usersData[i].email === email)
                return [true, usersData[i]];
        }
        return [false];
    }

    static getUserById(userId) {
        let data = localStorage.getItem('users');
        if (data) {
            data = JSON.parse(data).data;
            const userJson = data.find(userData => userData.id === userId);
            if (userJson)
                return User.fromJson(userJson);
        }
    }

    static addProductToUserProducts(userId, productId) {
        const user = this.getUserById(userId);
        console.log(user.products);
        user.products.push(productId);
        let data = localStorage.getItem('users');
        if (data) {
            data = JSON.parse(data).data;
            data = data.map(userData => {
                if (userData.id === user.id)
                    userData.products = user.toJson().products;
                return userData;
            });
            localStorage.setItem('users', JSON.stringify( { data: data } ));
        }
    }

    static removeProductfromUserProducts(userId, productId) {
        const user = this.getUserById(userId);
        user.products.filter(prod => prod.id !== productId);
        let data = localStorage.getItem('users');
        if (data) {
            data = JSON.parse(data).data;
            data = data.map(userData => {
                if (userData.id === user.id)
                    userData.products = user.toJson().products;
                return userData;
            });
            localStorage.setItem('users', JSON.stringify( { data: data } ));
        }
    }

    static addProductToUserCart(userId, productId) {
        const user = this.getUserById(userId);
        user.cart.push(productId);
        let data = localStorage.getItem('users');
        if (data) {
            data = JSON.parse(data).data;
            data = data.map(userData => {
                if (userData.id === user.id)
                    userData.cart = user.cart;
                return userData;
            });
            localStorage.setItem('users', JSON.stringify( { data: data } ));
        }
    }

    static removeProductfromUserCart(userId, productId) {
        const user = this.getUserById(userId);
        user.cart = user.cart.filter(prodId => prodId !== productId);
        let data = localStorage.getItem('users');
        if (data) {
            data = JSON.parse(data).data;
            data = data.map(userData => {
                if (userData.id === user.id)
                    userData.cart = user.cart;
                return userData;
            });
            localStorage.setItem('users', JSON.stringify( { data: data } ));
        }
    }

    static isProductInUserCart(productId, user) {
        console.log(user.cart);
        return user.cart.includes(productId);
    }
}