const payUMoney = require("payumoney_nodejs");

class PaymentService {

    constructor() {
        // Set you MERCHANT_KEY, MERCHANT_SALT_KEY, PAYUMONEY_AUTHORIZATION_HEADER
        // for both Production and Sandox Account
        // payUMoney.setProdKeys("83XDghsi", "ndocKmKJus", "N+dx2Eq1RM83qlvYOiDv6lVF/5AXCIpVQHx+l1Duq5w=");
        // payUMoney.setSandboxKeys("Ir5IBlOx", "xT1Ek8BBuH", "OVyRlajGq5h6oAwVukopKjyYaKhS9lsWZMQW27hq4t8=");
        payUMoney.setSandboxKeys("gpk0CC2R", "uGDyVGxCgi", "GLHlNxLhk82iP3QZv2Er+kjP/vUJ/jGJu2M6nBRGxjA=");
        payUMoney.isProdMode(false);
    }

    public makePayment(paymentBody: any, callback: (error: any, response: any) => void) {
        payUMoney.pay(paymentBody, (error: any, response: any) => {
            console.log("paymentBody44: ", paymentBody);
            if (error) {
                console.error("makePayment error : " + error);
                callback(error, null);
            } else {
                console.log("Payment Redirection link44 " + response);
                callback(error, {url : response});
            }
        });
    }

    public paymentSuccess(paymentSuccessBody: any, callback: (error: any, response: any) => void) {
        console.log("Payment Success");
        console.log("Payment Details : " + JSON.stringify(paymentSuccessBody));
        // You can Update your user payment Success status here
        callback(null, {status : "Payment Success"});
    }

    public paymentFailure(paymentFailureBody: any, callback: (error: any, response: any) => void) {
        console.log("Payment Failure");
        console.log("Payment Details : " + JSON.stringify(paymentFailureBody));
        // You can Update your user payment Failure status here
        callback(null, {status : "Payment Failed"});
    }
}

Object.seal(PaymentService);
export = PaymentService;
