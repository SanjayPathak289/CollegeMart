const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    email: String,
    pass: String,
    productinfo: [
        {
            pname: String,
            pdesc: String,
            pcateg: String,
            pprice: Number,
            pimage: [],
        }
    ],
    wishlist: [
        {
            pname: String,
            pdesc: String,
            pcateg: String,
            pprice: Number,
            pimage: [],
        }
    ]

})

userSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this.email }, "sanjaypathakisagoodboy")
        return token;
    } catch (error) {
        console.log(error);
    }
}
const UserCred = new mongoose.model("UserCred", userSchema);
module.exports = UserCred;