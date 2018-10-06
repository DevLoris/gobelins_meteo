
const AJAX = {
    get(url, callback) {
        this.buildRequest('GET', url, {}, callback);
    },
    post(url, data, callback) {
        this.buildRequest('POST', url, data, callback);
    },
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