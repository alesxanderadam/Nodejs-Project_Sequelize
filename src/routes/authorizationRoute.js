const express = require('express');
const { signUp } = require('../controllers/authorizationController');
const authorizationRoute = express.Router();


authorizationRoute.post("/signUp", signUp);

module.exports = {
    authorizationRoute
}