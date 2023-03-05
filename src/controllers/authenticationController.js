const { failCode, successCode, error } = require('../config/response');
const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize)
const { generateToken } = require('../utils/jwtoken')
const bcrypt = require('bcrypt')

const signIn = async (req, res) => {
    // Truy cập vào database get đúng email và password 
    // Kiểm tra 2 lần email đến pasword
    let { email, pass } = req.body;
    try {
        let checkUser = await model.user.findOne({
            where: {
                email
            }
        })

        // Email
        if (checkUser) {
            //Check password
            let checkPassword = bcrypt.compare(pass, checkUser.pass_word);
            if (checkPassword) {
                let token = generateToken(checkUser)
                successCode(res, token, "Login user success");
                return;
            }
            else {
                failCode(res, { email, pass }, "Password error")
                return;
            }
        } else {
            failCode(res, { email, pass_word }, "Email khong ton tai")
            return;
        }
    } catch (err) {
        error(res, "Sever error...")
    }

}

module.exports = {
    signIn
}