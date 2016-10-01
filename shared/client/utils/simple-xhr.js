import {isAuthenticated, authenticate, getToken} from '../../../client/auth';

function request(method, url, data, onLoad, onError) {
    if (!isAuthenticated()) {
        authenticate();
    }
    var request = new XMLHttpRequest();

    request.onload = () => {
        onLoad.apply(this, [request.responseText]);
    };

    request.onerror = () => {
        onError.apply(this, []);
    };

    request.open(method, url, true);
    request.setRequestHeader('Content-Type', 'application/json');
    request.setRequestHeader('Accept', 'application/json');
    request.setRequestHeader('Authorization', `Bearer ${getToken()}`);
    request.send(JSON.stringify(data));
}
 
function requestHandleError(method, url, data, onLoad) {
    request(method, url, data, onLoad, () => {
        console.error(method, url);
    });
}
 
function get(url, onLoad) {
    requestHandleError('GET', url, null, onLoad);
}

function post(url, data, onLoad) {
    requestHandleError('POST', url, data, onLoad);
}

function put(url, data, onLoad) {
    requestHandleError('PUT', url, data, onLoad);
}

module.exports = {
    request,
    requestHandleError,
    get,
    post,
    put
};
