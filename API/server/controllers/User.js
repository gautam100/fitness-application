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
    if(req.body.password != ""){
        var pwd = md5(req.body.password);
    }else{
        var pwd = '';
    }
    if(req.body.google_id != ""){
        var gid = req.body.google_id;
    }else{
        var gid = '';
    }
    if(req.body.facebook_id != ""){
        var fbid = req.body.facebook_id;
    }else{
        var fbid = '';
    }

    var credentials = { email: req.body.email, password: pwd, google_id: gid, facebook_id: fbid };
    Model_user.register(credentials, function (err, userData) {
        res.send(userData);
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
    Model_user.forgot(credentials, function (err, forgotData) {
        // console.log(forgotData.forgotDetails[0].user_email);
        if (forgotData.status == 1) {
            var transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                auth: {
                    user: 'piyush.sri.79@gmail.com',
                    pass: 'Piyush@'
                }
            });
            var mailOptions = {
                from: 'piyush.sri.79@gmail.com',
                to: forgotData.forgotDetails[0].user_email,
                subject: 'Forgot Password',
                html: forgotData.forgotDetails[0].user_pwd
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    res.send({ mailSent: false, msg: error });
                    console.log("erors: " + error);
                } else {
                    res.send({ mailSent: true, msg: 'Password sent your email address' });
                    console.log('Email sent: ' + info.response);
                }
                transporter.close();
            });
        } else {
            res.send({ mailSent: false, msg: 'Email address does not matched. Please try again.' });
        }
    });
}

