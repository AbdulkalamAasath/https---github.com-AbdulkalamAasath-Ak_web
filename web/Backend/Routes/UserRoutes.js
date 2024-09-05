const express = require('express')
const route = express.Router()
const {UserSignup,UserLogin} = require('../Controllers/UserControllers')
route.post('/signup',UserSignup)
route.post('/login',UserLogin)


module.exports = route