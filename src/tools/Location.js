/*
 * Lib for user location
 */
const Location = {
    long: false,
    lat: false,
    allow: false,

    last_cibling: null,

    /**
     * Init the User Location
     */
    init() {
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(e => this.setPosition(e));
        this.allow = navigator.geolocation != false;
    },
    /**
     * Callback for user location
     * @param position
     */
    setPosition(position) {
        this.last_cibling = Date.now();
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
    },
    /**
     * Peermit to get the user location, or, if not exist, the Paris location
     * @returns {string}
     */
    getPosition() {
        return this.allow && this.lat ? this.lat + "," + this.long : "48.8534,2.3488";
    }
};

export default Location;