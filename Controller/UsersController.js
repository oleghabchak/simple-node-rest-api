'use strict'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const response = require('./../response')
const db = require('./../settings/db')
const config = require('../config')

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
            const secondName = req.body.second_name !== '' ? req.body.second_name : 'Не вказано'
            const salt = bcrypt.genSaltSync(15)
            const password = bcrypt.hashSync(req.body.password, salt)

            const sql = "INSERT INTO `users`(`name`, `second_name`, `email`, `password`) VALUES('" + name + "', '" + secondName + "', '" + email + "', '" + password + "')";
            db.query(sql, (error, results) => {
                if(error) {
                    response.status(400, error, res)
                } else {
                    response.status(200, {message: `Реєстрація успішна :)`, results}, res)
                    }
            })
        }
    })
}

exports.signin = (req, res) => {
    db.query("SELECT `id`, `email`, `password` FROM `users` WHERE `email` = '" + req.body.email + "'", (error, rows, fields) => {
        if(error) {
            response.status(400, error, res)
        } else if(rows.length <= 0 ) {
            response.status(401, `Користувач - ${req.body.email} не знайдений. Зверніться до адміністратора.`, res)
        } else {
            const row = JSON.parse(JSON.stringify(rows))
            row.map(rw => {
                const password = bcrypt.compareSync(req.body.password, rw.password)
                if(password) {
                    //if true ми впускаємо користувача і генеруємо токен
                    const token = jwt.sign({
                        userId: rw.id,
                        email: rw.email
                    }, config.jwt, { expiresIn: 120 * 120 })
                    response.status(200, {token: ` Bearer ${token}`,  id: rw.id, email: rw.email}, res)
                } else {
                //помилка, пароль неправильний
                    response.status(401, {message: `Пароль невірний`}, res)
                    // console.log('password incorrect')
                }
                return true
            })
        }
    })  
}