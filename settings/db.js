const mysql = require('mysql')

const connection = mysql.createConnection({
    host: "109.94.209.66",
    // socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
    port: 3306,
    user: "admin6247k",
    password: "lao6247K",
    database: "trainlist"
})

connection.connect((error) => {
    if(error) {
        return console.log('Ошибка подключения к БД!');
    } else {
        return console.log('Подлючение успешно!');
    }
})

module.exports = connection