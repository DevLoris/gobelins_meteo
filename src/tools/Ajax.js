/*
Class to do AJAX call more easily
 */
const AJAX = {
    /**
     * Do a GET call on URL
     * @param url
     * @param callback
     */
    get(url, callback) {
        this.buildRequest('GET', url, {}, callback);
    },
    /**
     * Do a POST call on URL
     * @param url
     * @param data
     * @param callback
     */
    post(url, data, callback) {
        this.buildRequest('POST', url, data, callback);
    },
    /**
     * Build and execute any AJAX
     * @param type
     * @param url
     * @param params
     * @param callback
     */
    buildRequest(type, url, params, callback) {
        let request = new XMLHttpRequest();
        request.open(type , url, true);
        request.addEventListener('readystatechange', (e) => {
            if(request.readyState === 4) {
                if(request.status === 200) {
                    callback(JSON.parse(request.responseText));
                }
            }
        });
        request.send(params);
    }
}

export default AJAX;