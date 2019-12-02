var Dashboard = require('./../server/controllers/Dashboard');
var Detail = require('./../server/controllers/Detail');


var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', Dashboard.index);
router.get('/getDashboardContent', Dashboard.getDashboardContent);
router.get('/getDashboardBranchOfferCount', Dashboard.getDashboardBranchOfferCount);
router.post('/getDetailContent', Detail.getDetailContent);

module.exports = router;
