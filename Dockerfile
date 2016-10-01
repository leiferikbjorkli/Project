FROM node:4.2.1

env PORT=8000
env NODE_TLS_REJECT_UNAUTHORIZED=0

COPY confd /confd
COPY . /app
WORKDIR /app
EXPOSE 8000
CMD ./confd/confd -onetime -backend env -confdir /confd && npm install && npm run build && npm start
