import _ from 'lodash';
import request from './superagent-wrapper';

const error = _.curry((reject, err) => {
  reject({
    message: 'Unknown error',
    developerMessage: err.message
  });
});

const response = _.curry((resolve, reject, err, res) => {
  if (err) {
    reject(err);
  }
  if (res.ok) {
    resolve(res.body);
  }
});

const handler = {
  get (url) {
    return new Promise((resolve, reject) => {
      request
        .get(url)
        .on('error', error(reject))
        .end(response(resolve, reject))
    });
  },

  put (url, data) {
    return new Promise((resolve, reject) => {
      request
        .put(url)
        .send(data)
        .on('error', error(reject))
        .end(response(resolve, reject))
    });
  },

  post (url, data) {
    return new Promise((resolve, reject) => {
      request
        .post(url)
        .send(data)
        .on('error', error(reject))
        .end(response(resolve, reject))
    });
  },

  delete (url) {
    return new Promise((resolve, reject) => {
      request
        .del(url)
        .on('error', error(reject))
        .end(response(resolve, reject))
    });
  }
};

export default handler;
