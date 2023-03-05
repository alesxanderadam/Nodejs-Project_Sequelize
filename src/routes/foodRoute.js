const express = require('express');
const foodRoute = express.Router();
//import commonjs Module 
// import hàm getUser từ thư mục controller
const { getFood } = require('../controllers/foodController');
const { verifyToken } = require('../utils/jwtoken');

// tạo API phương thức GET
foodRoute.get("/getFood", getFood)
// tạo API phương thức POST
// tạo API phương thức PUT
// foodRoute.put("/updatefood",(req,res)=>{});
module.exports = foodRoute;