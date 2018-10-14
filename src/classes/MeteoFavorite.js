/*
 * Favorite place for Meteo
 */
class MeteoFavorite {
    /**
     * Create new instance
     * @param name
     * @param lat
     * @param long
     */
    constructor(name, lat, long) {
        this.name = name;
        this.long = long;
        this.lat = lat;
    };

    /**
     * Return position of favorite
     * @returns {string}
     */
    getPosition() {
        return   this.lat + "," + this.long  ;
    }
}


export default MeteoFavorite;