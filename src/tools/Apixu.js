/*
 * Apixu API
 */

const APIXU = class {
    /**
     * Create the Apixu API instance
     * @param lang
     */
    constructor(lang = "fr") {
        this.url_forecast = "http://api.apixu.com/v1/forecast.json?key=";
        this.url_search = "http://api.apixu.com/v1/search.json?key=";
        this.key = "ce5777858c294254b40141608180110";
        this.lang = lang;
    };

    /**
     * Return URL of the Forecast API
     * @param selector
     * @param day
     * @returns {string}
     */
    getForecast(selector, day = 5)  {
        return this.url_forecast + this.key + "&lang=fr&q="+ selector + "&days=" + day;
    };

    /**
     * Return URL of the Search API
     * @param selector
     * @returns {string}
     */
    getSearch(selector)  {
        return this.url_search + this.key + "&lang=fr&q="+ selector;
    }
};

export default APIXU;