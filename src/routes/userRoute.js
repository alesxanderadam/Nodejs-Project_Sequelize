const express = require('express');
const { diskStorage } = require('multer');
const multer = require("multer")
const userRoute = express.Router();
const fs = require("fs");
const { verifyToken } = require('../utils/jwtoken')

//import commonjs Module 
// import hàm getUser từ thư mục controller
const { getUser, createUser, getUserId, updateUser, deleteUser, addEvalute, getRestaurantByUser } = require('../controllers/userController');
// const upload = multer({ dest: `${process.cwd()}/public/img` })
const storage = diskStorage({
    destination: (req, file, cb) => {
        cb(null, `${process.cwd()}/public/img`)
    },
    filename: (req, file, cb) => {
        const d = new Date()
        const newName = d.getDate() + "_" + file.originalname
        cb(null, newName);
    }
})

const upload = multer({ storage })
userRoute.post("/upload",
    upload.single("file"),
    (req, res) => {
        fs.readFile(process.cwd() + "/public/img/" + req.file.filename, (err, data) => {
            let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString("base64")}"`;
            // Xóa hình vừa up
            // fs.unlinkSync(process.cwd() + "/public/img/" + req.file.filename);
            res.send(fileName);
        })
        // res.send(req.file)
    }
)

// tạo API phương thức GET
userRoute.get("/getUser", verifyToken, getUser)
userRoute.get("/getUserId/:id", verifyToken, getUserId)


// tạo API phương thức POST
userRoute.post("/createUser", verifyToken, createUser)
userRoute.put("/updateUser/:id", verifyToken, updateUser)
userRoute.put("/delete", verifyToken, deleteUser)
// tạo API phương thức PUT
// userRoute.put("/updateUser",(req,res)=>{});
module.exports = userRoute;