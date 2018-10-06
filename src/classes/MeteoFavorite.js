class MeteoFavorite {
    constructor(name, lat, long) {
        this.name = name;
        this.long = long;
        this.lat = lat;
    };

    getPosition() {
        return   this.lat + "," + this.long  ;
    }
}


export default MeteoFavorite;