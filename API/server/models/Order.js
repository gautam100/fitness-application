'use strict';

const db = require('./../config/database');
const connection = db.connection

exports.doOrders = function (paymentSuccessBody, callback) {

    if (paymentSuccessBody.status == 'success') {
        var status = 1;
    } else {
        var status = 0;
    }
    const orderDate = paymentSuccessBody.addedon.split(' ');

    var sql_query = 'INSERT INTO orders set order_no="' + paymentSuccessBody.udf1 + '", user_id="' + paymentSuccessBody.udf4 + '", product_branch_id="' + paymentSuccessBody.productinfo + '", txn_id="' + paymentSuccessBody.txnid + '", subscription_type="' + paymentSuccessBody.udf5 + '", charges="' + paymentSuccessBody.udf2 + '", discount="' + paymentSuccessBody.udf3 + '", total_amount="' + paymentSuccessBody.net_amount_debit + '", order_status="' + status + '", order_date ="' + orderDate[0] + '", created="' + paymentSuccessBody.addedon + '", modified="' + paymentSuccessBody.addedon + '"';
    console.log("Inserted: ", sql_query);
    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { results: rows });
        // callback(null, { status: "Payment Success2" });
    });

    // connection.query(sql_query, function (err, rows) {
    //     if (err) throw err
    //     callback(null, { results: rows });
    // });
}

exports.getOrderConfirmation = function (where, callback) {
    var sql_query = "SELECT orders.order_no, orders.user_id, orders.product_branch_id, orders.txn_id, orders.subscription_type,orders.charges, orders.discount, orders.total_amount, orders.created,users.user_email,users.user_mobile,product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, products.name, products.description FROM orders left join users on orders.user_id = users.user_id left join product_branches ON orders.product_branch_id=product_branches.id LEFT JOIN products on product_branches.product_id=products.id WHERE orders.order_no=" + where.order_id;
    // console.log(sql_query);
    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { results: rows });
    });
}
