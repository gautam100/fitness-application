'use strict';

const db = require('./../config/database');
const connection = db.connection

exports.getDetailContent = function (where, callback) {
    var sql_query = "SELECT products.name, products.description, product_branches.id, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt, product_branches.quaterly_subscription_amt, product_branches.halfyearly_subscription_amt, product_branches.yearly_subscription_amt, GROUP_CONCAT(branch_offers.branch_offer SEPARATOR ', ') as offer FROM product_branches left join products ON products.id=product_branches.product_id left join branch_offers ON branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and product_branches.id=" + where.product_id + " GROUP BY product_branches.product_id";
    console.log(sql_query);

    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { results: rows });
    });
}

exports.getDetailImageContent = function (where, callback) {
    var sql_query = "SELECT branch_id, branch_image FROM branch_images WHERE branch_images.branch_id = " + where.product_id;
    // console.log(sql_query);

    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { results: rows });
    });
}

