const mongoose = require("mongoose");
// const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${shop}.6bfruws.mongodb.net/${shop}?retryWrites=true&w=majority`;
//db name - shop
const connectDb = async () => {

    try {
        const conn = await mongoose.connect("mongodb://127.0.0.1/shop", {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("MongoDB Connection Successful")

    } catch (error) {
        console.log(error)

    }

}
module.exports.connectDb = connectDb;

