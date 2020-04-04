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

exports.getCategoryContent = function (req, res) {
  model_dashboard.getCategoryContent(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
    }
  });
}

exports.getCateList = function (req, res) {
  model_dashboard.getCateList(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
    }
  });
}

exports.getCateName = function (req, res) {
  model_dashboard.getCateName(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
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
