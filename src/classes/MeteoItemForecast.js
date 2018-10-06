import ICON_LIST from '../tools/MeteoIconList';
import METEO_DIC from '../tools/MeteoDictionnary';

class MeteoItemForecast {
    constructor() {
        this.date = 0;
        this.condition = {};
        this.average_temperature = 10;
        this.min_temperature = 10;
        this.max_temperature = 10;
    };
    init(date, avg_temp, min_temp, max_temp, condition) {
        this.date = date;
        this.condition = condition;
        this.average_temperature = avg_temp;
        this.min_temperature = min_temp;
        this.max_temperature = max_temp;
    };

    getIcon() {
        return ICON_LIST[this.condition.code];
    };

    getName() {
        var now = new Date();
        var month = ('0' + (now.getMonth() + 1)).slice(-2);
        var date = ('0' + now.getDate()).slice(-2);
        if(this.date == now.getFullYear() + "-" + month + "-" +  date)
            return METEO_DIC.day_today;
        else
            return METEO_DIC['day_' + (new Date(this.date).getDay())];

    }
}


export default MeteoItemForecast;