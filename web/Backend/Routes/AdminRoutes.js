const express = require('express')
const route = express.Router()
const {AdminSignup,AdminLogin} = require('../Controllers/AdminControllers')
route.post('/signup',AdminSignup)
route.post('/login',AdminLogin)


module.exports = route