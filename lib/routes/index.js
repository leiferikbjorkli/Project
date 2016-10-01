var pages = require('./pages');
var router = require('express').Router();

router.get('/', pages.index);


module.exports = router;
