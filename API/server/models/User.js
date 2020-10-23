'use strict';
const db = require('./../config/database');
const connection = db.connection

const jwt = require('jsonwebtoken');
const fs = require('fs');
const RSA_PRIVATE_KEY = fs.readFileSync('./../API/server/config/private.key', 'utf8');
var jwtBearerToken = null;

exports.index = function (where, callback) {
  var jwtBearerToken = null;
  var status = 0;
  var expiresIn = null;
  var expireTimeUnit = 'second';

  var sql_query = 'SELECT * from users WHERE user_email="' + where.email + '" AND user_password="' + where.password + '" AND user_status="enable"';
  // console.log("query: ", sql_query);
  var result = { user_name: null };
  var user_name = null;
  var user_id = null;

  // query.on('error', function (err) {
  //   status = 0;
  //   console.log('Database error!', err);
  // });

  connection.query(sql_query, function (err, rows) {
    if (err) throw err

    if (rows.length > 0) {
      // console.log(rows);
      status = 1;
      expiresIn = 60 * 60;   // in second (By Default)
      result = rows
      user_name = result[0].user_email;
      user_id = result[0].user_id;

      var payload = {
        algorithm: 'RS256',
        expiresIn: expiresIn,
        subject: JSON.stringify(result)
      }
      jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);
    }
    callback(null, { status: status, user_name: user_name, user_id: user_id, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
  });
  //return loginDetails;
}

exports.selectProfile = function (where, callback) {
  var userDetails = [];
  var status = 0;
  var sql_query = "SELECT users.* from users WHERE users.user_id='" + where.userId + "'";
  console.log(sql_query);

  connection.query(sql_query, function (err, rows) {
    if (err) throw err

    if (rows.length > 0) {
      // console.log(rows);
      userDetails.push(rows);
      status = 1;
    }
    callback(null, { userDetails: userDetails, status: status });
  });
}

exports.profile = function (where, callback) {
  var loginDetails = [];
  var status = 0;
  console.log("Check: " + where.password_check);
  if (where.password_check == true) {
    var sql_query = "UPDATE users set user_name='" + where.user_name + "', user_pwd='" + where.user_pwd + "' WHERE user_id='" + where.userId + "'";
  } else {
    var sql_query = "UPDATE users set user_name='" + where.user_name + "' WHERE user_id='" + where.userId + "'";
  }

  var query = connection.query(sql_query, function (err, result) {
    console.log("results: " + result);
    if (err) {
      console.log('Database error!', err);
    }
    if (result != undefined && result.rowCount > 0) {
      status = 1;
    } else {
      status = 0;
    }
    callback(null, { status: status });
  });
}

exports.register = function (where, callback) {
  var jwtBearerToken = null;
  var status = 0;
  var expiresIn = null;
  var expireTimeUnit = 'second';
  var result = { user_name: null };
  var user_name = null;

  // console.log("newwhere: ", where);

  if (where.facebook_id != "") {
    var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND fbid="' + where.facebook_id + '" AND user_status="enable"';
    // console.log(sql_query_select);
    connection.query(sql_query_select, function (err, rows) {
      if (err) throw err

      if (rows.length > 0) {
        status = 2;
        expiresIn = 60 * 60;   // in second (By Default)
        result = rows
        user_name = result[0].user_email;
        var payload = {
          algorithm: 'RS256',
          expiresIn: expiresIn,
          subject: JSON.stringify(result)
        }
        jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);
        callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
      } else {
        var sql_query = 'INSERT INTO users set user_email="' + where.email + '", fbid="' + where.facebook_id + '"';
        if (connection.query(sql_query)) {
          var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND fbid="' + where.facebook_id + '" AND user_status="enable"';
          // console.log(sql_query_select);
          connection.query(sql_query_select, function (err, rows) {
            if (err) throw err

            if (rows.length > 0) {
              status = 1;
              expiresIn = 60 * 60;   // in second (By Default)
              result = rows
              user_name = result[0].user_email;
              var payload = {
                algorithm: 'RS256',
                expiresIn: expiresIn,
                subject: JSON.stringify(result)
              }
              jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);

              var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 1";
              console.log(sql_query_template);

              connection.query(sql_query_template, function (err, rows_template) {
                if (err) throw err
                callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit, emailTemplate: rows_template });
              });
            }
          });
        } else {
          callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
        }
      }
    });
  } else if (where.google_id != "") {
    var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND google_id="' + where.google_id + '" AND user_status="enable"';
    console.log(sql_query_select);
    connection.query(sql_query_select, function (err, rows) {
      if (err) throw err

      if (rows.length > 0) {
        console.log("records: ", rows);
        status = 2;
        expiresIn = 60 * 60;   // in second (By Default)
        result = rows
        user_name = result[0].user_email;
        var payload = {
          algorithm: 'RS256',
          expiresIn: expiresIn,
          subject: JSON.stringify(result)
        }
        jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);
        callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
      } else {
        var sql_query = 'INSERT INTO users set user_email="' + where.email + '", google_id="' + where.google_id + '"';
        if (connection.query(sql_query)) {
          var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND google_id="' + where.google_id + '" AND user_status="enable"';
          connection.query(sql_query_select, function (err, rows) {
            if (err) throw err

            if (rows.length > 0) {
              // console.log(rows);
              status = 1;
              expiresIn = 60 * 60;   // in second (By Default)
              result = rows
              user_name = result[0].user_email;
              var payload = {
                algorithm: 'RS256',
                expiresIn: expiresIn,
                subject: JSON.stringify(result)
              }
              jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);

              var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 1";
              console.log(sql_query_template);

              connection.query(sql_query_template, function (err, rows_template) {
                if (err) throw err
                callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit, emailTemplate: rows_template });
              });
            }
          });
        } else {
          callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
        }
      }
    });
  } else {
    var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND user_password!="" AND user_status="enable"';
    connection.query(sql_query_select, function (err, rows) {
      if (err) throw err

      if (rows.length > 0) {
        status = 2;
        callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
      } else {
        var sql_query = 'INSERT INTO users set user_email="' + where.email + '", user_password="' + where.password + '"';
        if (connection.query(sql_query)) {
          var sql_query_select = 'SELECT * from users WHERE user_email="' + where.email + '" AND user_password="' + where.password + '" AND user_status="enable"';
          connection.query(sql_query_select, function (err, rows) {
            if (err) throw err

            if (rows.length > 0) {
              status = 1;
              expiresIn = 60 * 60;   // in second (By Default)
              result = rows
              user_name = result[0].user_email;
              var payload = {
                algorithm: 'RS256',
                expiresIn: expiresIn,
                subject: JSON.stringify(result)
              }
              jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, payload);

              var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 1";
              console.log(sql_query_template);

              connection.query(sql_query_template, function (err, rows_template) {
                if (err) throw err
                callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit, emailTemplate: rows_template });
              });
            }
            // callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit });
          });
        } else {
          callback(null, { status: status, user_name: user_name, idToken: jwtBearerToken, expiresAt: expiresIn, expireTimeUnit: expireTimeUnit, emailTemplate: rows_template });
        }
      }
    });
  }

}

exports.forgot = function (where, callback) {
  var forgotDetails = [];
  var status = 0;
  var sql_query = "SELECT user_id, user_email, user_password from users WHERE user_email='" + where.email + "' AND user_password!=''";
  console.log(sql_query);


  var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 2";
  console.log(sql_query_template);

  // var query = connection.query(sql_query);
  // query.on('error', function (err) {
  //   var status = 0;
  //   console.log('Database error!', err);
  // });
  // query.on('row', (row) => {
  //   forgotDetails.push(row);
  //   status = 1;
  // });

  // query.on("end", function () {
  //   callback(null, { forgotDetails: forgotDetails, status: status });
  //   // connection.end();
  // });

  connection.query(sql_query, function (err, rows) {
    if (err) throw err
    if (rows.length > 0) {
      status = 1;

      connection.query(sql_query_template, function (err, rows_template) {
        if (err) throw err
        if (rows_template.length > 0) {
          status = 1;
        }
        callback(null, { forgotDetails: rows, emailTemplate: rows_template, status: status });
      });
    } else {
      callback(null, { forgotDetails: rows, status: status });
    }
  });
}

exports.resetPassword = function (where, callback) {
  var resetDetails = [];
  var status = 0;
  var sql_query = "SELECT user_email from users WHERE user_id='" + where.user_id + "' AND user_password!=''";
  console.log(sql_query);

  connection.query(sql_query, function (err, rows) {
    if (err) throw err
    if (rows.length > 0) {
      console.log("email: ", rows[0].user_email);
      status = 1;
      var sql_update_query = "UPDATE users set user_password='" + where.reset_password + "' WHERE user_email='" + rows[0].user_email + "' AND user_password!=''";
      connection.query(sql_update_query, function (err, rows_update) {
        if (err) throw err
        if (rows_update) {
          status = 1;

          var sql_query_template = "SELECT from_email, from_name, subject, content from email_templates WHERE id = 8";
          // console.log(sql_query_template);

          connection.query(sql_query_template, function (err, rows_template) {
            if (err) throw err
            if (rows_template.length > 0) {
              status = 1;
            }
            callback(null, { resetDetails: rows, emailTemplate: rows_template, status: status });
          });

        } else {
          status = 0;
          callback(null, { resetDetails: rows, status: status });
        }
      });
    } else {
      callback(null, { resetDetails: rows, status: status });
    }
  });
}

exports.getUserOrders = function (where, callback) {
  var orderDetails = [];
  var status = 0;
  var sql_query = "SELECT od.*, ct.name as catName, pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, p.name, p.description from orders as od LEFT JOIN product_branches as pb on od.product_branch_id=pb.id LEFT JOIN products as p on pb.product_id=p.id LEFT JOIN categories as ct on p.category_id=ct.id WHERE od.user_id='" + where.userId + "' order by order_date desc";
  console.log(sql_query);

  connection.query(sql_query, function (err, rows) {
    if (err) throw err

    if (rows.length > 0) {
      // console.log(rows);
      orderDetails.push(rows);
      status = 1;
    }
    callback(null, { orderDetails: orderDetails, status: status });
  });
}

exports.getUserOrdersDetails = function (where, callback) {
  var orderDetails = [];
  var status = 0;
  var sql_query = "SELECT od.*, ct.name as catName, pb.branch_address, pb.branch_city, pb.branch_state, pb.branch_pincode, pb.branch_contact_no, p.name, p.description from orders as od LEFT JOIN product_branches as pb on od.product_branch_id=pb.id LEFT JOIN products as p on pb.product_id=p.id LEFT JOIN categories as ct on p.category_id=ct.id WHERE od.id='" + where.orderId + "'";
  console.log(sql_query);

  connection.query(sql_query, function (err, rows) {
    if (err) throw err

    if (rows.length > 0) {
      // console.log(rows);
      orderDetails.push(rows);
      status = 1;
    }
    callback(null, { orderDetails: orderDetails, status: status });
  });
}

exports.managePassword = function (where, callback) {
  var status = 0;
  console.log("Check: " + where.user_pwd);

  var sql_update_query = "UPDATE users set user_password='" + where.user_pwd + "' WHERE user_id='" + where.userId + "' AND user_password='" + where.existing_user_pwd + "'";
  console.log(sql_update_query);

  // var query = connection.query(sql_query, function (err, result) {
  //   console.log("results: " + result.rowCount);
  //   if (err) {
  //     console.log('Database error!', err);
  //   }
  //   if (result != undefined && result.rowCount > 0) {
  //     status = 1;
  //   } else {
  //     status = 0;
  //   }
  //   callback(null, { status: status });
  // });


  connection.query(sql_update_query, function (err, rows_update) {
    if (err) throw err
    console.log("count: ", rows_update.affectedRows);
    if (rows_update.affectedRows == 1) {
      status = 1;
    } else if (rows_update.affectedRows == 0) {
      status = 2;
    } else {
      status = 0;
    }
    callback(null, { status: status });
  });

}

exports.manageUpdateAddress = function (where, callback) {
  var status = 0;
  console.log("Check: " + where.user_pwd);

  var sql_update_query = "UPDATE users set user_address='" + where.address + "' WHERE user_id='" + where.userId + "'";
  // console.log(sql_update_query);

  connection.query(sql_update_query, function (err, rows_update) {
    if (err) throw err
    if (rows_update.affectedRows == 1) {
      status = 1;
    } else {
      status = 0;
    }
    callback(null, { status: status });
  });

}

exports.questionRaised = function (where, callback) {
  var status = 0;

  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var formatted = dt.format('Y-m-d');

  var sql_insert_query = "INSERT supports set user_id='" + where.userId + "', email='" + where.email + "', mobile_no='" + where.mobile + "', comment='" + where.comment + "', request_raised='" + formatted + "', created='" + formatted + "', modified='" + formatted + "'";
  // console.log(sql_insert_query);

  connection.query(sql_insert_query, function (err, rows_update) {
    if (err) throw err
    if (rows_update.affectedRows == 1) {
      status = 1;
    } else {
      status = 0;
    }
    callback(null, { status: status });
  });

}