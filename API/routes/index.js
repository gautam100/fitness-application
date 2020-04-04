var Dashboard = require('./../server/controllers/Dashboard');
var Detail = require('./../server/controllers/Detail');
var User = require('./../server/controllers/User');
var Order = require('./../server/controllers/Order');
// var PaymentRoutes = require('./PaymentRoutes');
var PaymentController = require("./../server/controllers/PaymentController");

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/dashboard', Dashboard.index);
router.post('/getDashboardContent', Dashboard.getDashboardContent);
router.get('/getCategoryContent', Dashboard.getCategoryContent); //get the left menu categories

router.post('/getCateList', Dashboard.getCateList); //get the left menu categories

router.post('/getCateName', Dashboard.getCateName); //get the left menu categories

router.get('/getDashboardBranchOfferCount', Dashboard.getDashboardBranchOfferCount);

router.post('/getDetailContent', Detail.getDetailContent);

router.post('/getDetailImageContent', Detail.getDetailImageContent);

router.post('/login', User.login);

router.post('/register', User.register);

router.post('/doOrders', Order.doOrders);

router.post('/getOrderConfirmation', Order.getOrderConfirmation);

// router.get('/getDetailContent', Detail.getDetailContent, function(req, res) {
//   // res.render('index', { title: 'Express' });
// });

// router.post('/pay', Payment.doOrders);
// app.use("/api/payment/", new PaymentRoutes().routes);
router.post("/api/payment/pay", PaymentController.createPayment);
router.post("/api/payment/payment-confirmation-page", PaymentController.paymentSuccess);
router.post("/api/payment/payment-failure-page", PaymentController.paymentFailure);

module.exports = router;
