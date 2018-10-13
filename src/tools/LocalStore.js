/*
Permet de gérer le local storage plus facilement
 */

const LocalStore = {
    /**
     * Push content into localStorage
     * @param name
     * @param data
     */
    push(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    },

    /**
     * Get content from localStorage with a default value if not exist
     * @param name
     * @param not_exist
     */
    pull(name, not_exist = {}) {
        var get = localStorage.getItem(name);
        return get == null ? not_exist : JSON.parse(get);
    }
};

export default LocalStore;