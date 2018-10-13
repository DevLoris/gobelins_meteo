const APIXU = class {
    constructor(lang = "fr") {
        this.url_forecast = "http://api.apixu.com/v1/forecast.json?key=";
        this.url_search = "http://api.apixu.com/v1/search.json?key=";
        this.key = "ce5777858c294254b40141608180110";
        this.lang = lang;
    };
    getForecast(selector, day = 5)  {
        return this.url_forecast + this.key + "&lang=fr&q="+ selector + "&days=" + day;
    };
    getSearch(selector)  {
        return this.url_search + this.key + "&lang=fr&q="+ selector;
    }
};

export default APIXU;