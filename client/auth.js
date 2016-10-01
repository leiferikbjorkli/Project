import {domain, clientId, callbackUrl, scopes} from './config';
import {Base64} from 'js-base64';

// This file is in ES5 on purpose because it will be reused by application not running ES6.
function parseHash() {
    var params = {}, param;
    var hashes = window.location.hash.replace('#', '').split('&');
    for (var i = 0; i < hashes.length; i++) {
        param = hashes[i].split('=');
        params[param[0]] = param[1];
    }
    return params;
}

function saveToken(token) {
    sessionStorage.setItem('userToken', token);
}

function getClaimsFromToken(jwt) {
    var encoded = jwt && jwt.split('.')[1];
    var jsonString = Base64.decode(encoded);
    return JSON.parse(jsonString);
}

function getApplicationRoot() {
    return window.location.origin + getVirtualPath();
}

export function appIsRunningLocally() {
    return window.location.hostname === 'localhost';
}

function getVirtualPath() {
    return appIsRunningLocally() ? '' : '/' + window.location.pathname.split('/')[1];
}

function getCurrentState() {
    var state = window.location.href.replace(getApplicationRoot(), '');
    return encodeURIComponent(state);
}

function getAuth0Url() {
    var encodedCallback = encodeURIComponent(callbackUrl);
    var state = getCurrentState();
    var encodedScopes = encodeURIComponent(scopes);
    return `https://${domain}/authorize?client_id=${clientId}&response_type=token&redirect_uri=${encodedCallback}&scope=${encodedScopes}&state=${state}`
}

function redirectToAuth0() {
    window.location.replace(getAuth0Url());
}

function getStateFromHash() {
    var parameters = parseHash();
    return decodeURIComponent(parameters.state);
}

function redirectToState() {
    var state = getStateFromHash();
    window.location.replace(getApplicationRoot() + state);
}

function hashIsPresent() {
    return !!window.location.hash;
}

function tryParseToken() {
    if (hashIsPresent()) {
        var parameters = parseHash(window.location.hash);
        return parameters.id_token;
    }
    return null;
}

export function authenticate() {
    var token = tryParseToken();
    if (token) {
        saveToken(token);
        redirectToState();
    } else {
        redirectToAuth0();
    }
}

export function getUserInfo() {
    return getClaimsFromToken(getToken());
}

function isExpired(jwt) {
    var claims = getClaimsFromToken(jwt);
    var epochNow = new Date().getTime() / 1000;
    return claims.exp <= epochNow - 10;
}
export function getToken() {
    return sessionStorage.getItem('userToken');
}

export function isAuthenticated() {
    var userToken = getToken();
    if (userToken) {
        return !isExpired(userToken);
    }
    return false;
}
