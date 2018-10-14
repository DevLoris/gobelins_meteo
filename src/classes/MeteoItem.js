import ICON_LIST from '../tools/MeteoIconList';
import PLAYLIST from '../tools/MeteoPlaylist';
import AJAX from '../tools/Ajax';
import APIXU from '../tools/Apixu';
import LOCALSTORE from '../tools/LocalStore';
import LOCALSTORE_KEYS from '../tools/LocalStoreKeys';
import MeteoItemForecast from '../classes/MeteoItemForecast';

class MeteoItem {
    /**
     * Create an empty instance
     */
    constructor() {
        this.city = null;
        this.country = null;
        this.is_day = true;
        this.condition = {};
        this.temperature = 10;
        this.forecast = [];
        this.date = new Date().getDay() + "-" + new Date().getMonth() + "-"+new Date().getFullYear();
    };

    /**
     * Get icon from meteo code
     * @returns {*}
     */
    getIcon() {
        return (ICON_LIST[this.condition.code] !== undefined) ? ICON_LIST[this.condition.code]: "cloud";
    };

    /**
     * Get Spotify playlist from meteo code
     * @returns {*}
     */
    getPlaylist() {
        let playlist_code =  (PLAYLIST.code[this.condition.code] !== undefined) ?  PLAYLIST.code[this.condition.code] : "cloud";
        return PLAYLIST.playlists[playlist_code];
    };

    /**
     * Set data of Meteo
     * @param city
     * @param country
     * @param is_day
     * @param condition
     * @param temperature
     */
    setData(city, country, is_day, condition, temperature) {
        this.city = city;
        this.country = country;
        this.is_day = is_day;
        this.condition = condition;
        this.temperature = temperature;
    };

    /**
     * Init the meteo and get data from API
     * @param selector
     * @param then
     */
    init(selector, then) {
        var api = new APIXU(LOCALSTORE.pull(LOCALSTORE_KEYS.lang, "fr"));
        AJAX.get(api.getForecast(selector), e =>  { this.fromJson(e,then); });
    };

    /**
     * Init data with cached values (from LocalStorage)
     * @param cached
     */
    fromCache(cached) {
        [this.city, this.country] = [cached.city, cached.country];
        [this.is_day, this.condition, this.temperature] = [cached.is_day,cached.condition, cached.temperature];
        let forecast;

        cached.forecast.map(item => {
            forecast = new MeteoItemForecast();
            forecast.init(item.date, item.average_temperature, item.min_temperature, item.max_temperature, item.condition);
            this.forecast.push(forecast);
        });
    }

    /**
     * Init data from JSON returned by the API
     * @param json
     * @param then
     */
    fromJson(json, then) {
        [this.city, this.country] = [json.location.name, json.location.country];
        [this.is_day, this.condition, this.temperature] = [json.current.is_day, json.current.condition, json.current.temp_c];

        let forecast;


        json.forecast.forecastday.map(item => {
            forecast = new MeteoItemForecast();
            forecast.init(item.date, item.day.avgtemp_c, item.day.mintemp_c, item.day.maxtemp_c, item.day.condition);
            this.forecast.push(forecast);
        });

        then(this);
    }
}


export default MeteoItem;