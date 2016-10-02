#!/bin/sh

PORT=8000 \
NODE_TLS_REJECT_UNAUTHORIZED=0 \
nodemon index.js
