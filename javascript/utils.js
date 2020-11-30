class Utils {
    static generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }

    static getUserFromUrl() {
        const url_string = (window.location.href).toLowerCase();
        const url = new URL(url_string);
        const userId = url.searchParams.get('id');
        return AuthService.getUserById(userId);
    }
}