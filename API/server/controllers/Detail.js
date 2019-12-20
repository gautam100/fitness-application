'use strict';
const model_detail = require('./../models/Detail');

exports.getDetailContent = function (req, res, next) {
  model_detail.getDetailContent(req.body, function (err, results) {    
      res.send(results);
  });
}

//get image for details page
exports.getDetailImageContent = function (req, res, next) {
  model_detail.getDetailImageContent(req.body, function (err, results) {    
      res.send(results);
  });
}
