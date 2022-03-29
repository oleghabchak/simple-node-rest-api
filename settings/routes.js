'use strict'

module.exports = (app) => {
    
    const usersController = require('./../Controller/UsersController')

   
    app
    .route('/api/users')
    .get(usersController.getAllUsers)

    app
    .route('/api//users/signup')
    .post(usersController.signup)

}