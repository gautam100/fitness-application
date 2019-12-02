'use strict';

const db = require('./../config/database');
const connection = db.connection

exports.getDetailContent = function (where, callback) {

    var rows = [];
    var sql_query = "SELECT products.id, products.name, products.description, product_branches.id, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id WHERE product_branches.active=1 and products.active ";

    // if ("product_id" in where)
        sql_query = sql_query + " and product_branches.id=2";

    console.log(sql_query);

    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
    });
}

