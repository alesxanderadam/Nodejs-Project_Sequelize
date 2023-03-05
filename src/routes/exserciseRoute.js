const express = require('express');
const { getLike, addLike, createOrderByUser, unLike, getRestaurantByUser, addEvalute } = require('../controllers/exserciseController');
const { verifyToken } = require('../utils/jwtoken');

const exserciseRoute = express.Router();


exserciseRoute.get("/getLike", verifyToken, getLike)
exserciseRoute.post("/addLike", verifyToken, addLike)
exserciseRoute.post("/unlike", verifyToken, unLike)
exserciseRoute.post("/order", verifyToken, createOrderByUser)
exserciseRoute.get("/getRestaurantByUser/:id", verifyToken, getRestaurantByUser)
exserciseRoute.post("/addEvalute", verifyToken, addEvalute)

module.exports = exserciseRoute;



module.exports = exserciseRoute