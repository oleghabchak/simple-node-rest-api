'use strict'

const response = require('./../response')
const db = require('./../settings/db')

exports.getAllUsers = (req, res) => {

    db.query('SELECT `id`, `name`, `second_name`, `email` FROM `users`', (error, rows, fields) => {
        if(error) {
            console.log(400, error, res);
        } else {
            response.status(200, rows, res)
        }
    })

}

exports.signup = (req, res) => {

    const sql = "INSERT INTO `users`(`name`, `second_name`, `email`) VALUES('" + req.query.name + "', '" + req.query.second_name + "', '" + req.query.email + "')";
    db.query(sql, (error, results) => {
        if(error) {
            console.log(error);
        } else {
            response.status(results, res)
        }
    })

}