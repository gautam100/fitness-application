'use strict';
const order_detail = require('./../models/Order');

exports.doOrders = function (req, res, next) {
  order_detail.doOrders(req.body, function (err, results) {    
      res.send(results);
  });
}

