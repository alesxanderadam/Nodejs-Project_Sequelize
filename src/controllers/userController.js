// const User = require('../models/user');
const { failCode, successCode, error } = require('../config/response');
const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const model = initModels(sequelize)
// Get all
const getUser = async (req, res) => {
    try {
        let data = await model.user.findAll(); // => list object => [{}]
        if (data) {
            successCode(res, data, "Get user success")
        } else {
            failCode(res, data, "Can't get user, please check api")
        }
    } catch (err) {
        error(res, "server error, waiting ...")
    }
}

const getUserId = async (req, res) => {
    let { id } = req.params
    // 2 CÁCH
    // Cách 1
    // SELECT * FROM user WHERE user_id=req.param.id;
    // let data = await User.findAll({
    //     where: {
    //         user_id: id
    //     }
    // });
    // let dataUserId = data.find(item => item.user_id == id)
    try {
        // Cách 2 sử dụng hàm findeOne của suqleline
        let dataOne = await model.user.findOne({
            where: {
                user_id: id
            }
        }); // => object => {}
        if (dataOne) {
            successCode(res, dataOne, "Get user success")
        } else {
            failCode(res, dataOne, "User not found")
        }
    } catch (err) {
        error(res, "User not found")
    }
}

// xử lý thêm user
const createUser = async (req, res) => {
    // Lấy data request for backend
    let { full_name, email, pass_word } = req.body;
    let models = {
        full_name,
        email,
        pass_word: bcrypt.hashSync(pass_word, 10)
    }
    let data = await model.user.create(models);
    successCode(res, data, "Create user success")
}


const updateUser = async (req, res) => {
    let { id } = req.params
    try {
        let dataOne = await model.user.findOne({
            where: {
                user_id: id
            }
        }); // => object => {}
        if (dataOne) {
            let { full_name, email, pass_word } = req.body;
            let model = {
                full_name,
                email,
                pass_word: bcrypt.hashSync(pass_word, 10)
            }
            let data = await User.update(model, { where: { user_id: id } });
            if (data)
                successCode(res, data, "Update user success")
        } else {
            failCode(res, dataOne, "User not found")
        }
    } catch (err) {
        error(res, "Sever error...")
    }
}
const deleteUser = async (req, res) => {
    let { id } = req.params;
    await User.destroy(id);
}

module.exports = {
    getUser,
    createUser,
    getUserId,
    updateUser,
    deleteUser
}