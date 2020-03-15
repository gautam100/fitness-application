'use strict';
const paymentService = require("./../service/PaymentService");

exports.createPayment = function (req, res, next) {
    const paymentBody = req.body;

    console.log("paymentBody:: ", paymentBody);
    
    paymentService.makePayment(paymentBody, function (error, result) {
        if (error) {
            res.send(error);
        } else {
            console.log("result_check: ", result);
            res.send(result);
        }
    });
}

exports.paymentSuccess = function (req, res, next) {
    const paymentSuccessBody = req.body;
    paymentService.paymentSuccess(paymentSuccessBody, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            // Redirect to payment success page
            const redirectUrl = "http://localhost:4200/payment/payment-confirmation-page/"+paymentSuccessBody.udf1;
            res.redirect(redirectUrl);
        }
    });
}

exports.paymentFailure = function (req, res, next) {
    const paymentFailureBody = req.body;
    paymentService.paymentFailure(paymentFailureBody, (error, result) => {
        if (error) {
            res.send(error);
        } else {
            // Redirect to payment failure page
            const redirectUrl = "http://localhost:4200/payment/payment-failure-page/"+paymentFailureBody.udf1;
            res.redirect(redirectUrl);
        }
    });
}

