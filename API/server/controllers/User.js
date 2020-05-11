'use strict';
const Model_user = require('./../models/User');
const nodemailer = require('nodemailer');
var md5 = require('md5');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const RSA_PUBLIC_KEY = fs.readFileSync('./server/config/public.key', 'utf8');

exports.checkIfAuthenticated = function (req, res, next) {
    var token = req.headers.authorization;

    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    jwt.verify(token, RSA_PUBLIC_KEY, function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: err });
        } else {
            var decodedToken = jwt.decode(token);
            var currentUserDetail = JSON.parse(decodedToken.sub);
            req.currentUserDetail = currentUserDetail;
            next();
        }
    });

}

exports.login = function (req, res) {
    var credentials = { email: req.body.email, password: md5(req.body.password) };
    Model_user.index(credentials, function (err, userData) {
        res.send(userData);
    });
}

exports.register = function (req, res) {
    if (req.body.password != "") {
        var pwd = md5(req.body.password);
    } else {
        var pwd = '';
    }
    if (req.body.google_id != "") {
        var gid = req.body.google_id;
    } else {
        var gid = '';
    }
    if (req.body.facebook_id != "") {
        var fbid = req.body.facebook_id;
    } else {
        var fbid = '';
    }

    var credentials = { email: req.body.email, password: pwd, google_id: gid, facebook_id: fbid };
    Model_user.register(credentials, function (err, userData) {
        // res.send(userData);

        if (userData.status == 1) {
            console.log("userdataaas::: ", userData);
            // console.log("emailsTT:: ", userData.emailTemplate[0].content);

            var description = userData.emailTemplate[0].content;
            description = description.replace('##user_name##', userData.user_name);

            var transporter = nodemailer.createTransport({
                host: 'smtp.googlemail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'piyush.sri.79',
                    pass: 'jucwvkxztgweturs'
                }
            });
            var mailOptions = {
                from: userData.emailTemplate[0].from_email,
                to: userData.user_name,
                subject: userData.emailTemplate[0].subject,
                html: description // mail content
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send({ mailSent: false, msg: error, status:3 });
                    console.log("erors: " + error);
                } else {
                    res.send(userData);
                    console.log('Email sent: ' + info.response);
                }
                transporter.close();
            });
        } else {
            // res.send({ mailSent: false, msg: 'Register not successfully. Please try again.' });
            res.send(userData);
        }
    });
}

exports.getProfile = function (req, res) {
    var credentials = { userId: req.currentUserDetail.user_id };
    //var credentials = { userId: req.body.userId };
    Model_user.selectProfile(credentials, function (err, userData) {
        res.send({ 'userData': userData });
    });
}

exports.editProfile = function (req, res) {
    var userId = req.currentUserDetail.user_id;
    if (req.body.password_check == true) {
        var credentials = { userId: userId, user_name: req.body.user_name, user_pwd: md5(req.body.user_pwd), password_check: req.body.password_check };
    } else {
        var credentials = { userId: userId, user_name: req.body.user_name, password_check: req.body.password_check };
    }
    Model_user.profile(credentials, function (err, userData) {
        res.send({ 'userData': userData });
    });
}

//To forgot password
exports.forgot = function (req, res) {
    var credentials = { email: req.body.email };
    console.log("cred::", credentials);
    Model_user.forgot(credentials, function (err, forgotData) {
        if (forgotData.status == 1) {
            // console.log("emails:: ", forgotData.forgotDetails[0].user_email);
            // console.log("emailsTT:: ", forgotData.emailTemplate[0].content);
            // console.log("status: ", forgotData.status);
            var description = forgotData.emailTemplate[0].content;
            description = description.replace('##user_name##', forgotData.forgotDetails[0].user_email);
            description = description.replace('##user_id##', forgotData.forgotDetails[0].user_id);

            var transporter = nodemailer.createTransport({
                host: 'smtp.googlemail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'piyush.sri.79',
                    pass: 'jucwvkxztgweturs'
                }
            });
            var mailOptions = {
                from: forgotData.emailTemplate[0].from_email,
                to: forgotData.forgotDetails[0].user_email,
                subject: forgotData.emailTemplate[0].subject,
                html: description // mail content
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send({ mailSent: false, msg: error });
                    console.log("erors: " + error);
                } else {
                    res.send({ mailSent: true, msg: 'Password reset link sent your mail address', status: forgotData.status });
                    console.log('Email sent: ' + info.response);
                }
                transporter.close();
            });
        } else {
            res.send({ mailSent: false, msg: 'Email address not exist. Please try again.', status: forgotData.status });
        }
    });
}

exports.reset = function (req, res) {
    var credentials = { reset_password: md5(req.body.reset_password), user_id: req.body.user_id };
    console.log("reset::", credentials);
    Model_user.resetPassword(credentials, function (err, UpdatePassword) {

        if (UpdatePassword.status == 1) {
            // console.log("emails:: ", UpdatePassword.resetDetails[0].user_email);
            // console.log("emailsTT:: ", UpdatePassword.emailTemplate[0].content);
            // console.log("status: ", UpdatePassword.status);
            var description = UpdatePassword.emailTemplate[0].content;
            description = description.replace('##user_name##', UpdatePassword.resetDetails[0].user_email);

            var transporter = nodemailer.createTransport({
                host: 'smtp.googlemail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'piyush.sri.79',
                    pass: 'jucwvkxztgweturs'
                }
            });
            var mailOptions = {
                from: UpdatePassword.emailTemplate[0].from_email,
                to: UpdatePassword.resetDetails[0].user_email,
                subject: UpdatePassword.emailTemplate[0].subject,
                html: description // mail content
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send({ mailSent: false, msg: error });
                    console.log("erors: " + error);
                } else {
                    res.send({ mailSent: true, msg: 'Password changed successfully', status: UpdatePassword.status });
                    console.log('Email sent: ' + info.response);
                }
                transporter.close();
            });
        } else {
            res.send({ mailSent: false, msg: 'Please enter right credentials.', status: UpdatePassword.status });
        }
    });
}

