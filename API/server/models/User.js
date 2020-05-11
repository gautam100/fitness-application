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