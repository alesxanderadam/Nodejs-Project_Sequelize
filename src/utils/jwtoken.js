const jwt = require('jsonwebtoken')
// Taọ token
const generateToken = (data) => {
    // Truyền vào 3 tham số: payload, serectKey, header
    // * Nếu chỉ định nghĩa 2 tham số thì tham số thứ nhất chỉ đượcc phép truyền object
    // expiresIn nều truyền là số sẽ là ms && "10s" giay && "10m" phut 
    return jwt.sign({ data }, "17Nb2Wa#", { expiresIn: "30m" })
}

// Kiểm tra Tokken
const checkToken = (token) => {
    let check = jwt.verify(token, "17Nb2Wa#")
    return check;
}

const verifyToken = (req, res, next) => {
    let { tokenquanghuy } = req.headers
    if (!tokenquanghuy) {
        res.status(401).send("Auth failed")
        return;
    }
    try {
        let ckToken = checkToken(tokenquanghuy);
        if (ckToken) {
            req.user = ckToken;
            next();
        }
    } catch (err) {
        res.status(401).send(err)
    }

}



module.exports = {
    generateToken,
    checkToken,
    verifyToken
}