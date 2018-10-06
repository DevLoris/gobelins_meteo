
const LocalStore = {
    push(name, data) {
        localStorage.setItem(name, JSON.stringify(data));
    },
    pull(name, not_exist = {}) {
        var get = localStorage.getItem(name);
        return get == null ? not_exist : JSON.parse(get);
    }
};

export default LocalStore;