const superagent = require('superagent');
const auth = require('../auth');

function getDefaultHeaders() {
  const token = auth.getToken();
  if (token) {
    return {
      'Authorization': 'Bearer ' + token
    };
  }
}

const request = {};

function ensureAuthentication() {
  if (!auth.isAuthenticated()) {
    auth.authenticate();
  }
}

request.get = function(url) {
  ensureAuthentication();
  return superagent.get(url).set(getDefaultHeaders());
};

request.post = function(url) {
  ensureAuthentication();
  return superagent.post(url).set(getDefaultHeaders());
};

request.put = function(url) {
  ensureAuthentication();
  return superagent.put(url).set(getDefaultHeaders());
};

request.patch = function(url) {
  ensureAuthentication();
  return superagent.patch(url).set(getDefaultHeaders());
};

request.del = function(url) {
  ensureAuthentication();
  return superagent.del(url).set(getDefaultHeaders());
};

export default request;
