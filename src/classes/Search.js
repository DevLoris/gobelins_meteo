import AJAX from '../tools/Ajax';

class Search {
    constructor() {
        this.results = [];
    }

    init(selector) {
        AJAX.get("http://api.apixu.com/v1/search.json?key=ce5777858c294254b40141608180110&lang=fr&q=" +selector, e => this.fromJson(e));
    };

    fromJson(json) {
        this.results = json;
    }
}

export default Search;