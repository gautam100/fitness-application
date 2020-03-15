var Dashboard = require('./../server/controllers/Dashboard');
var Detail = require('./../server/controllers/Detail');
var User = require('./../server/controllers/User');
var Order = require('./../server/controllers/Order');

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', Dashboard.index);
router.get('/getDashboardContent', Dashboard.getDashboardContent);
router.get('/getCategoryContent', Dashboard.getCategoryContent); //get the left menu categories

router.post('/getCateList', Dashboard.getCateList); //get the left menu categories

router.get('/getDashboardBranchOfferCount', Dashboard.getDashboardBranchOfferCount);

router.post('/getDetailContent', Detail.getDetailContent);

router.post('/getDetailImageContent', Detail.getDetailImageContent);

router.post('/login', User.login);

router.post('/register', User.register);

router.post('/doOrders', Order.doOrders);

// router.get('/getDetailContent', Detail.getDetailContent, function(req, res) {
//   // res.render('index', { title: 'Express' });
// });

module.exports = router;
