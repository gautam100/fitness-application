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
    // console.log('SELECT pb.id,pb.product_id,pp.name,pp.description,pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_person, pb.branch_contact_no, pb.monthly_subscription_amt,bi.branch_image,count(distinct bo.id ) as offerCount FROM `product_branches` pb LEFT JOIN branch_images bi on pb.`id`=bi.branch_id LEFT JOIN branch_offers bo on bo.branch_id=pb.`id` LEFT JOIN products pp on pp.id=pb.product_id group by pb.`id`,product_id order by pb.id');
    // connection.query('SELECT products.id, products.name, products.description, product_branches.id, count(branch_offers.branch_id) as offerCount, branch_images.branch_image, product_branches.branch_address, product_branches.branch_city, product_branches.branch_state, product_branches.branch_pincode, product_branches.branch_contact_person, product_branches.branch_contact_no, product_branches.monthly_subscription_amt FROM products left join product_branches on products.id=product_branches.product_id left join branch_images ON branch_images.branch_id=product_branches.id left join branch_offers on branch_offers.branch_id=product_branches.id WHERE product_branches.active=1 and products.active=1 group by product_branches.id order by product_branches.id', function (err, rows) {

    var sql_query = 'SELECT cat.id, cat.name, pp.name,pp.description,pb.id,pb.product_id,pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_person, pb.branch_contact_no, pb.monthly_subscription_amt,bi.branch_image,count(distinct bo.id ) as offerCount FROM `product_branches` pb LEFT JOIN branch_images bi on pb.`id`=bi.branch_id LEFT JOIN branch_offers bo on bo.branch_id=pb.`id` LEFT JOIN products pp on pp.id=pb.product_id left join categories as cat on cat.id=pp.category_id ';

    if (where.location != "") {
        sql_query += ' WHERE pb.branch_address like "%' + where.location + '%"';
    }

    sql_query += ' group by pb.`id`,product_id';

    if (where.price_sort != "") {
        sql_query += ' order by pb.monthly_subscription_amt ' + where.price_sort;
    } else {
        sql_query += ' order by pb.id';
    }
    console.log(sql_query);
    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
        // callback(null, { status: "Payment Success2" });
    });

}

exports.getCategoryContent = function (where, callback) {
    connection.query('Select id, name FROM categories WHERE categories.active=1 order by categories.id', function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
    });
}

exports.getCateList = function (where, callback) {
    // console.log('SELECT pb.id,pb.product_id,pp.name,pp.description,pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_person, pb.branch_contact_no, pb.monthly_subscription_amt,bi.branch_image,count(distinct bo.id ) as offerCount FROM `product_branches` pb LEFT JOIN branch_images bi on pb.`id`=bi.branch_id LEFT JOIN branch_offers bo on bo.branch_id=pb.`id` LEFT JOIN products pp on pp.id=pb.product_id left join categories cat on cat.id=pp.category_id WHERE cat.id='+where.cat_id+' and pb.active=1 and pp.active=1 group by pb.`id`,product_id order by pb.id');
    var sql_query = 'SELECT pb.id,pb.product_id,pp.name,pp.description,pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_person, pb.branch_contact_no, pb.monthly_subscription_amt,bi.branch_image,count(distinct bo.id ) as offerCount FROM `product_branches` pb LEFT JOIN branch_images bi on pb.`id`=bi.branch_id LEFT JOIN branch_offers bo on bo.branch_id=pb.`id` LEFT JOIN products pp on pp.id=pb.product_id left join categories cat on cat.id=pp.category_id WHERE 1=1 ';

    if (where.cat_id != "") {
        sql_query += ' AND cat.id=' + where.cat_id;
    }

    if (where.location != "") {
        sql_query += ' and pb.branch_address like "%' + where.location + '%"';
    }

    sql_query += ' and pb.active=1 and pp.active=1 group by pb.`id`,product_id ';

    if (where.price_sort != "") {
        sql_query += ' order by pb.monthly_subscription_amt ' + where.price_sort;
    } else {
        sql_query += ' order by pb.id';
    }
    console.log(sql_query);
    connection.query(sql_query, function (err, rows) {
        if (err) throw err
        callback(null, { result: rows });
        // callback(null, { status: "Payment Success2" });
    });
}

exports.getCateName = function (where, callback) {
    // console.log('SELECT pb.id,pb.product_id,pp.name,pp.description,pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_person, pb.branch_contact_no, pb.monthly_subscription_amt,bi.branch_image,count(distinct bo.id ) as offerCount FROM `product_branches` pb LEFT JOIN branch_images bi on pb.`id`=bi.branch_id LEFT JOIN branch_offers bo on bo.branch_id=pb.`id` LEFT JOIN products pp on pp.id=pb.product_id left join categories cat on cat.id=pp.category_id WHERE cat.id='+where.cat_id+' and pb.active=1 and pp.active=1 group by pb.`id`,product_id order by pb.id');
    connection.query('SELECT id, name FROM categories as cat WHERE cat.id=' + where.cat_id + ' and cat.active=1', function (err, rows) {
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
