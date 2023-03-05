const sequelize = require('../models/index');
const initModels = require('../models/init-models');
const models = initModels(sequelize)
const { successCode, failCode, error } = require("../config/response");

const getLike = async (req, res) => {
    try {
        let data = await models.like_res.findAll({
            include: [{
                model: models.user,
                as: "user",
                attributes: ["user_id", "full_name", "email"]
            }],
            attributes: ["res_id", "date_like"]
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

const getRestaurantByUser = async (req, res) => {
    let { id } = req.params
    let user = await models.user.findOne({
        where: { user_id: parseInt(id) }
    })
    if (!user) {
        failCode(res, "user not found")
    }
    try {
        const evaluates = await models.Evaluate.findAll({
            where: { user_id: parseInt(id) }
        });
        successCode(res, evaluates, "success code")
    } catch (error) {
        console.log(error)
        error(res, "sever error")
    }
}

const addLike = async (req, res) => {
    let { res_id } = req.body
    try {
        const [like, created] = await models.like_res.findOrCreate({
            where: { user_id: req.user.data.user_id, res_id },
            defaults: { date_like: new Date() }
        });

        if (!created) {
            return res.status(201).json('Nhà hàng đã được thích trước đó');
        }
        return res.status(200).json('Thêm nhà hàng thích thành công');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
}

const unLike = async (req, res) => {
    let { res_id } = req.body

    try {
        let idDelete = await models.like_res.destroy({ where: { user_id: req.user.data.user_id, res_id } });
        if (idDelete) {
            return res.status(200).json(`Xóa nhà hàng có id ${res_id} thành công`);
        } else {
            return res.status(201).json(`Nhà hàng có id ${res_id} chưa được thêm vào danh sách thích `)
        }

    } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
    }
}

const addEvalute = async (req, res) => {
    const { res_id, content } = req.body;
    try {
        let data = await models.Evaluate.create({
            user_id: req.user.data.user_id,
            res_id,
            content
        });
        if (data) {
            successCode(res, data, "Create comment success")
            return;
        } else {
            failCode(res, "Data not found")
            return;
        }
    } catch (err) {
        error(res, "Error")
    }


}


const createOrderByUser = async (req, res) => {
    let { user_id } = req.user.data
    try {
        let checkFoodId = await models.order.findOne({
            where: { user_id: parseInt(user_id), food_id: parseInt(req.body.food_id) }
        })
        if (checkFoodId) {
            return res.status(201).json(`Bạn đã thích thức ăn này rồi`);
        } else {
            const data = await models.order.create({
                user_id,
                ...req.body,
            })
            if (data) {
                successCode(res, data, "create order success")
            } else {
                failCode(res, data, "error")
            }
        }
    } catch (err) {
        error(res, "Sever error")
    }
}


module.exports = {
    getLike,
    addLike,
    getRestaurantByUser,
    unLike,
    addEvalute,
    createOrderByUser
}