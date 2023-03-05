const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const models = initModels(sequelize)
const { successCode, failCode, error } = require("../config//response")
const getFood = async (req, res) => {
    // let data = await models.food.findAll({
    //     include: ["type"] //Chuỗi hoặc danh sách chuỗi
    // });
    // let data = await models.food_type.findAll({
    //     include: ["foods"] //Chuỗi hoặc danh sách chuỗi
    // });

    // let data = await models.like_res.findAll({
    //     include: ["res", "user"] //Chuỗi hoặc danh sách chuỗi
    // });
    try {
        let data = await models.user.findAll({
            include: ["res_id_restaurants"]
        })
        if (data) {
            successCode(res, data, "Xử lý thành công")
        } else {
            failCode(res, data, "Food not found")
        }
    } catch (err) {
        error(res, "Sever error")
    }

}
module.exports = {
    getFood
}