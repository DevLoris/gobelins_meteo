const Location = {
    long: false,
    lat: false,
    allow: false,

    init() {
        if(navigator.geolocation)
            navigator.geolocation.getCurrentPosition(e => this.setPosition(e));
        this.allow = navigator.geolocation != false;
    },
    setPosition(position) {
        this.long = position.coords.longitude;
        this.lat = position.coords.latitude;
    },
    getPosition() {
        return this.allow && this.lat ? this.lat + "," + this.long : "48.8534,2.3488";
    }
};

export default Location;