const express = require('express');
const route = express.Router();
const { DataEntry,Dataretrive } = require('../Controllers/UserControllers');
const  UserAuth  = require('../MiddleWare/UserAuth');

route.use(UserAuth);
route.post('/postdata/:id', DataEntry);
route.get('/getdata/:id',Dataretrive );

module.exports = route;
