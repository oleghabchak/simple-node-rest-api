const mysql = require('mysql')

const connection = mysql.createConnection({
    host:"109.94.209.66",
    user: "admin6247k",
    port: 3306,
    password: "lao6247K",
    database:"trainlist",

})

connection.connect((error) => {
    if(error) {
        return console.log('Помилка підключення до БД!');
    } else {
        return console.log('Підключення успішне !!))');
    }
})

module.exports = connection