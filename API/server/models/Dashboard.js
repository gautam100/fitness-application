'use strict';

const db = require('./../config/database');
const connection = db.connection

exports.getDashboardData = function (where, callback) {

    var rows = [];

    connection.query('SELECT * from products order by id', function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
    });

    // var unmet_need = [];
    // var sql_query = "SELECT * from users order by user_id ";
    // var query = connection.query(sql_query);
    // console.log(sql_query);
    // query.on('error', function (err) {
    //     console.log('Database error!', err);
    // });
    // query.on('row', (row) => {
    //     unmet_need.push(row);
    // });
    // query.on("end", function () {
    //     //connection.end();
    //     callback(null, { unmet_need });
    // });

}

exports.getDashboardContent = function (where, callback) {
    var rows = [];
    // console.log('SELECT products.id, products.name, products.description, product_branches.id, count(branch_offers.branch_id) as offerCount, branch_images.branch_image, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id left join branch_images ON branch_images.branch_id=product_branches.id left join branch_offers on branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and products.active group by product_branches.id order by product_branches.id');
    connection.query('SELECT products.id, products.name, products.description, product_branches.id, count(branch_offers.branch_id) as offerCount, branch_images.branch_image, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id left join branch_images ON branch_images.branch_id=product_branches.id left join branch_offers on branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and products.active group by product_branches.id order by product_branches.id', function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
    });
}

exports.getDashboardBranchOfferCount = function (where, callback) {
    var rows = [];
    // console.log('SELECT products.id, products.name, products.description, product_branches.id, count(branch_offers.branch_id) as offerCount, branch_images.branch_image, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id left join branch_images ON branch_images.branch_id=product_branches.id left join branch_offers on branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and products.active group by product_branches.id order by product_branches.id');
    connection.query('SELECT products.id, products.name, products.description, product_branches.id, count(branch_offers.branch_id) as offerCount, branch_images.branch_image, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id left join branch_images ON branch_images.branch_id=product_branches.id left join branch_offers on branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and products.active group by product_branches.id order by product_branches.id', function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
    });
}
