import ICON_LIST from '../tools/MeteoIconList';
import PLAYLIST from '../tools/MeteoPlaylist';
import AJAX from '../tools/Ajax';
import APIXU from '../tools/Apixu';
import LOCALSTORE from '../tools/LocalStore';
import LOCALSTORE_KEYS from '../tools/LocalStoreKeys';
import MeteoItemForecast from '../classes/MeteoItemForecast';

class MeteoItem {
    constructor() {
        this.city = null;
        this.country = null;
        this.is_day = true;
        this.condition = {};
        this.temperature = 10;
        this.forecast = [];
        this.date = new Date().getDay() + "-" + new Date().getMonth() + "-"+new Date().getFullYear();
    };

    getIcon() {
        return ICON_LIST[this.condition.code];
    };

    getPlaylist() {
        return PLAYLIST.playlists[PLAYLIST.code[this.condition.code]];
    };

    setData(city, country, is_day, condition, temperature) {
        this.city = city;
        this.country = country;
        this.is_day = is_day;
        this.condition = condition;
        this.temperature = temperature;
    };

    init(selector, then) {
        var api = new APIXU(LOCALSTORE.pull(LOCALSTORE_KEYS.lang, "fr"));
        AJAX.get(api.getForecast(selector), e =>  { this.fromJson(e,then); });
    };

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