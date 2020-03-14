const payUMoney = require("payumoney_nodejs");

const order_detail = require('./../models/Order');

const db = require('./../config/database');
const connection = db.connection

payUMoney.setSandboxKeys("gpk0CC2R", "uGDyVGxCgi", "GLHlNxLhk82iP3QZv2Er+kjP/vUJ/jGJu2M6nBRGxjA=");
payUMoney.isProdMode(false);

exports.makePayment = function (paymentBody, callback) {
    payUMoney.pay(paymentBody, (error, response) => {
        console.log("paymentBody44: ", paymentBody);
        if (error) {
            console.error("makePayment error : " + error);
            callback(error, null);
        } else {
            console.log("Payment Redirection link : " + response);
            callback(error, { url: response });
        }
    });
}


exports.paymentSuccess = function (paymentSuccessBody, callback) {
    console.log("Payment DetailsY : ", JSON.stringify(paymentSuccessBody));
    // You can Update your user payment Success status here

    order_detail.doOrders(paymentSuccessBody, function (err, results) {
        // res.send(results);
        callback(null, { status: "Payment Success2" });
    });
    // callback(null, { status: "Payment Success" });
}

exports.paymentFailure = function (paymentFailureBody, callback) {
    console.log("Payment DetailsN : " + JSON.stringify(paymentFailureBody));

    order_detail.doOrders(paymentFailureBody, function (err, results) {
        callback(null, { status: "Payment Failed" });
    });

    // You can Update your user payment Failure status here
    // callback(null, { status: "Payment Failed" });
}


// Object.seal(PaymentService);
// exports.PaymentService;
