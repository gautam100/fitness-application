'use strict';

const db = require('./../config/database');
const connection = db.connection

exports.doOrders = function (where, callback) {

    var sql_query = 'INSERT INTO orders set order_no="12345", user_id="' + where.user_id + '", product_branch_id="' + where.product_branch_id + '", txn_id="545454", subscription_type="' + where.subscription_type + '", charges="' + where.charges + '", discount="' + where.discount + '", total_amount="' + where.total_amount + '", order_status="1", order_date ="", created="", modified=""';
    console.log("Inserted: ", sql_query);
    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { results: rows });
    });
}
