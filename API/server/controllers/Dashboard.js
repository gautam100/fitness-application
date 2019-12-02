'use strict';
const model_dashboard = require('./../models/Dashboard');

var elementData =null;

exports.index = function (req, res) {

  model_dashboard.getDashboardData(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
      elementData = result;
      console.log(elementData);
    }
  });
}

exports.getDashboardContent = function (req, res) {

  model_dashboard.getDashboardContent(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
      elementData = result;
      // console.log(elementData);
    }
  });
}

exports.getDashboardBranchOfferCount = function (req, res) {

  model_dashboard.getDashboardBranchOfferCount(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
      elementData = result;
      // console.log(elementData);
    }
  });
}
