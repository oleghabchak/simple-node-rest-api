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

    db.query("SELECT `id`, `name`, `email` FROM `users` WHERE `email` = '"+ req.body.email + "'", (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else if (typeof rows !== 'undefined' && rows.length > 0){
            console.log(rows)
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                response.status(302, {message: `Користувач з таким email - ${rw.email} уже зареєстрований!`}, res)
                return true
            })
        } else {
            const email = req.body.email
            const name = req.body.name
            const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не указано'
            const password = req.body.password

            const sql = "INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" + name + "', '" + secondName + "', '" + email + "', '" + password + "')";
            
            db.query(sql, (error, results) => {
                    if(error) {
                        response.status(400, error, res)
                    } else {
                        response.status(200, {message: `Реєстрація успішна.`, results}, res)
                    }
            })
        }
    })
}