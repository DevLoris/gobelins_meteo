import AJAX from '../tools/Ajax';
import APIXU from '../tools/Apixu';
import LOCALSTORE from '../tools/LocalStore';
import LOCALSTORE_KEYS from '../tools/LocalStoreKeys';

class Search {
    constructor() {
        this.results = [];
    }

    init(selector) {
        var api = new APIXU(LOCALSTORE.pull(LOCALSTORE_KEYS.lang, "fr"));
        AJAX.get(api.getSearch(selector), e => this.fromJson(e));
    };

    fromJson(json) {
        this.results = json;
    }
}

export default Search;