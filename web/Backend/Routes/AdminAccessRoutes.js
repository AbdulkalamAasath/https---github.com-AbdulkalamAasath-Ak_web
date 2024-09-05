const express = require('express');
const route = express.Router();
const { AdminSignup, AdminLogin,usersinfo,updateproduct } = require('../Controllers/AdminControllers');
const { DataEntry,Dataretrive } = require('../Controllers/UserControllers');
const  AdminAuth  = require('../MiddleWare/AdminAuth');

route.use(AdminAuth);
route.get('/getdata',usersinfo );
route.get('/getdata/:id',Dataretrive );
route.post('/updatedata/:id',updateproduct);
module.exports = route;
