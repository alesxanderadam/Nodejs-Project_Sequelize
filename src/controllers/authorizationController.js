const { failCode, successCode, error } = require('../config/response');
const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize)
const bcrypt = require('bcrypt');

const signUp = async (req, res) => {
    let { full_name, email, pass_word } = req.body;
    let newUsers = {
        full_name,
        email,
        pass_word: bcrypt.hashSync(pass_word, 10)
    }
    let data = await model.user.create(newUsers);
    successCode(res, data, "Create user success")
}

module.exports = {
    signUp
}