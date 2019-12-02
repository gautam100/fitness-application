'use strict';
const model_detail = require('./../models/Detail');

var elementData =null;

exports.getDetailContent = function (req, res) {

  model_detail.getDetailContent(req.body, function (err, result) {
    if (err) {
    } else {
      res.send(result);
      elementData = result;
      // console.log(elementData);
    }
  });
}
