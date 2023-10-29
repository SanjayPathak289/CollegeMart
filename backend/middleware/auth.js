const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        const verifyUser = jwt.verify(token, "sanjaypathakisagoodboy");
        console.log(verifyUser);
        req.user = verifyUser;
        next();
    } catch (error) {
        return res.json({ message: "Error" });
    }
}
module.exports = auth;
