'use strict';
const paymentService = require("./../service/PaymentService");
const nodemailer = require('nodemailer');

const db = require('./../config/database');
const connection = db.connection

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
            var sql_query = "SELECT orders.order_no, orders.user_id, orders.product_branch_id, orders.txn_id, orders.subscription_type,orders.charges, orders.discount, orders.total_amount, orders.created,users.user_email,users.user_mobile,product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, products.name, products.description FROM orders left join users on orders.user_id = users.user_id left join product_branches ON orders.product_branch_id=product_branches.id LEFT JOIN products on product_branches.product_id=products.id WHERE orders.order_no=" + paymentSuccessBody.udf1;
            connection.query(sql_query, function (err, rows) {
                if (err) throw err

                console.log("emails:: ", rows);

                var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 9";
                // console.log(sql_query_template);
                connection.query(sql_query_template, function (err, rows_template) {
                    if (err) throw err
                    if (rows_template.length > 0) {
                        console.log("rows_template:: ", rows_template);
                        var description = rows_template[0].content;

                        var balance = rows[0].charges - rows[0].discount;
                        var gstState = (balance * 9) / 100;
                        var gstCenter = (balance * 9) / 100;

                        description = description.replace('##user_name##', rows[0].user_email);
                        description = description.replace('##branch_name##', rows[0].name);
                        description = description.replace('##branch_address##', rows[0].branch_address);
                        description = description.replace('##branch_city##', rows[0].branch_city);
                        description = description.replace('##branch_contact_no##', rows[0].branch_contact_no);
                        description = description.replace('##subscription_plan##', rows[0].subscription_type);
                        description = description.replace('##subscription_amount##', rows[0].charges);
                        description = description.replace('##order_no##', rows[0].order_no);
                        description = description.replace('##txn_id##', rows[0].txn_id);
                        description = description.replace('##charges##', rows[0].charges);
                        description = description.replace('##discount##', rows[0].discount);
                        description = description.replace('##balance##', balance);
                        description = description.replace('##gst_state##', gstState);
                        description = description.replace('##gst_center##', gstCenter);
                        description = description.replace('##total_amount##', rows[0].total_amount);

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
                            from: rows_template[0].from_email,
                            to: rows[0].user_email,
                            subject: rows_template[0].subject,
                            html: description // mail content
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.send({ mailSent: false, msg: error });
                                console.log("erors: " + error);
                            } else {
                                res.send({ mailSent: true, msg: 'Payment successfully', status: 1 });
                                console.log('Email sent: ' + info.response);
                            }
                            transporter.close();
                        });
                        const redirectUrl = "http://localhost:4200/payment/payment-confirmation-page/" + paymentSuccessBody.udf1;
                        res.redirect(redirectUrl);
                    }
                });
            });
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
            var sql_query = "SELECT orders.order_no, orders.user_id, orders.product_branch_id, orders.txn_id, orders.subscription_type,orders.charges, orders.discount, orders.total_amount, orders.created,users.user_email,users.user_mobile,product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, products.name, products.description FROM orders left join users on orders.user_id = users.user_id left join product_branches ON orders.product_branch_id=product_branches.id LEFT JOIN products on product_branches.product_id=products.id WHERE orders.order_no=" + paymentFailureBody.udf1;
            connection.query(sql_query, function (err, rows) {
                if (err) throw err

                // console.log("emails:: ", rows);
                var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 10";
                // console.log(sql_query_template);
                connection.query(sql_query_template, function (err, rows_template) {
                    if (err) throw err
                    if (rows_template.length > 0) {
                        console.log("rows_template:: ", rows_template);
                        var description = rows_template[0].content;

                        var balance = rows[0].charges - rows[0].discount;
                        var gstState = (balance * 9) / 100;
                        var gstCenter = (balance * 9) / 100;

                        description = description.replace('##user_name##', rows[0].user_email);
                        description = description.replace('##branch_name##', rows[0].name);
                        description = description.replace('##branch_address##', rows[0].branch_address);
                        description = description.replace('##branch_city##', rows[0].branch_city);
                        description = description.replace('##branch_contact_no##', rows[0].branch_contact_no);
                        description = description.replace('##subscription_plan##', rows[0].subscription_type);
                        description = description.replace('##subscription_amount##', rows[0].charges);
                        description = description.replace('##order_no##', rows[0].order_no);
                        description = description.replace('##txn_id##', rows[0].txn_id);
                        description = description.replace('##charges##', rows[0].charges);
                        description = description.replace('##discount##', rows[0].discount);
                        description = description.replace('##balance##', balance);
                        description = description.replace('##gst_state##', gstState);
                        description = description.replace('##gst_center##', gstCenter);
                        description = description.replace('##total_amount##', rows[0].total_amount);

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
                            from: rows_template[0].from_email,
                            to: rows[0].user_email,
                            subject: rows_template[0].subject,
                            html: description // mail content
                        };
                        transporter.sendMail(mailOptions, function (error, info) {
                            if (error) {
                                res.send({ mailSent: false, msg: error });
                                console.log("erors: " + error);
                            } else {
                                res.send({ mailSent: true, msg: 'Payment Cancelled', status: 1 });
                                console.log('Email sent: ' + info.response);
                            }
                            transporter.close();
                        });
                        const redirectUrl = "http://localhost:4200/payment/payment-failure-page/" + paymentFailureBody.udf1;
                        res.redirect(redirectUrl);
                    }
                });
            });
        }
    });
}

