const express = require('express');
const rootRoute = express.Router();
const userRoute = require('./userRoute');
const foodRoute = require('./foodRoute');
const { authorizationRoute } = require('./authorizationRoute');
const { authenticationRoute } = require('./authenticationRoute');
const exserciseRoute = require('./exserciseRoute');
// const exserciseRoute = require('./exserciseRoute');

// sử dụng middleware của express
rootRoute.use("/user", userRoute)
rootRoute.use("/authorization", authorizationRoute)
rootRoute.use("/authentication", authenticationRoute)
rootRoute.use("/food", foodRoute)
rootRoute.use("/exsercise", exserciseRoute)


module.exports = rootRoute;