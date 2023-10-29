const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const auth = require("./middleware/auth")
const multer = require("multer");
const db = require("./db/conn");
const UserCred = require("./db/coll");
const Conversation = require("./db/conversation");
const Message = require("./db/message");


const path = require("path");
const exp = require("constants");
const { default: mongoose } = require("mongoose");
const { log } = require("console");
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ["POST", "GET", "DELETE"],
    credentials: true,
    optionSuccessStatus: 200
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/uploads", express.static("./public/Images"));
// app.use(session({
// name: `sanjaypathaksession`,
//     secret: 'sanjaypathakisagoodboy',
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: false,
//         maxAge: 1000 * 60 * 60 * 24
//     }
// }));

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "./public/Images")
    },
    filename: function (req, file, cb) {
        return cb(null, file.originalname)
    }
})
const upload = multer({ storage });
var uploadM = upload.fields([{ name: "image" }])

app.get("/", auth, async (req, res) => {
    if (req.user) {
        // return res.json({ valid: true, email: req.user });
        const data = await UserCred.findOne({ email: req.user });
        // console.log(data);
        return res.json(data);
    }
    else {
        return res.json({});
    }
})

app.post("/signup", async (req, res) => {
    const ifUser = await UserCred.findOne({ email: req.body.email });
    if (!ifUser) {
        const userData = new UserCred({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            pass: req.body.pass,
        })
        await userData.save();
    }
    else {
        res.status(400).json({ message: "User exists" });
    }
    // console.log("Hii");
    const data = req.body;

    // console.log(data);
})

app.get("/getuserinfo", auth, async (req, res) => {
    try {
        if (req.user) {
            const data = await UserCred.findOne({ email: req.user });
            // console.log(data);
            return res.json(data);
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

app.post("/signin", async (req, res) => {
    // try{
    const userEmail = req.body.email;
    const pass = req.body.pass;
    // console.log(userEmail);
    // console.log(pass);
    try {
        const data = await UserCred.findOne({ email: userEmail });
        // console.log(data);
        if (pass == data.pass) {
            const token = await data.generateAuthToken();
            res.cookie("jwt", token, {
                expires: new Date(Date.now() + 9999999),
                httpOnly: true,
            })
            req.user = userEmail;
            res.json(data);
        }
        else {
            res.status(500).json();
        }
    } catch (error) {
        res.status(500).json();
    }

    // console.log(userEmail);
    // }
    // catch(e){

    // }
    // console.log(req.user);
})

app.get("/logout", (req, res) => {

    res.clearCookie("jwt");
    req.user = null;
    return res.json({ message: "success" });
})


app.get("/profile", auth, async (req, res) => {
    const userProfile = await UserCred.findOne({ email: req.user },
    );
    console.log("profile");
    console.log(userProfile);
    // console.log(userProfile);
    return res.json(userProfile);

})

app.post("/additem", auth, uploadM, async (req, res) => {
    const { pname, pdesc, pcateg, pprice, pimage } = JSON.parse(req.body.json);
    // console.log(req.user);


    await UserCred.updateOne({
        email: req.user
    }, {
        $push: {
            productinfo: {
                pname,
                pdesc,
                pcateg,
                pprice,
                pimage
            }
        }
    })
    res.json({ success: true });
})
app.get("/myproducts", auth, async (req, res) => {
    const userProducts = await UserCred.findOne({ email: req.user },
        // {   

        //     productinfo: 1
        // }
    );
    // console.log(userProducts);
    return res.json(userProducts);
    //auth check krlega signin or not
})

app.get("/products", async (req, res) => {
    const allProducts = await UserCred.find();
    return res.json(allProducts);
})
app.get("/addwishlist", auth, async (req, res) => {
    const { pname, pdesc, pcateg, pprice, pimage } = req.query.param2;
    const userId = req.query.param1;
    var data;
    try {
        data = await UserCred.findOne({
            _id: userId,
            wishlist: {
                $elemMatch: {
                    $and: [
                        {
                            pname,
                            pdesc,
                            pcateg,
                            pprice,
                            pimage,
                        }, {
                            _id: { $exists: true }
                        }
                    ]
                }
            }
        })
    } catch (error) {
        console.log(error);
    }
    // console.log(data);
    if (data) {
        res.json({ inwishList: true });
    }
    else {
        res.json({ inwishList: false });
    }
})

app.post("/addwishlist", auth, async (req, res) => {
    const userId = req.body.userId;
    const { pname, pdesc, pcateg, pprice, pimage } = req.body.product;
    await UserCred.updateOne({
        _id: userId
    }, {
        $push: {
            wishlist: {
                pname,
                pdesc,
                pcateg,
                pprice,
                pimage,
            }
        }
    })
    res.json({ added: true });
})

app.delete("/addwishlist", auth, async (req, res) => {
    const userId = req.body.userId;
    const product = req.body.product;
    // console.log(userId);
    // console.log(product);
    const d = await UserCred.updateOne(
        {
            _id: userId
        }, {
        $pull: {
            wishlist: {
                pname: product.pname,
                pdesc: product.pdesc,
                pcateg: product.pcateg,
                pprice: product.pprice,
                pimage: product.pimage,
            }
        }
    }
    )
    // console.log(d);
    res.json({ deleted: true });
})
//add new conversation...
// app.post("/conversation", auth, async (req, res) => {
//     // try {
//     //     const myconversation = await Conversation.findOne({
//     //         members: {
//     //             $all: [req.body.members.senderId, req.body.members.receiverId]
//     //         }

//     //     })
//     //     if (myconversation && myconversation._id) {
//     //         return res.status(200).json(myconversation)
//     //     }
//     //     else {
//     const newConversation = new Conversation({
//         members: [req.body.members.senderId, req.body.members.receiverId]
//     })
//     try {
//         const savedConversation = await newConversation.save();
//         console.log(savedConversation);
//         return res.status(200).json(savedConversation);
//     } catch (error) {
//         res.status(500).json(error);
//     }
//     // }
//     // } catch (error) {
//     //     res.status(500).json(error);
//     // }

//     // console.log(req.body);

// })
app.post("/conversation", auth, async (req, res) => {
    // try {
    const myconversation = await Conversation.findOne({
        members: {
            $all: [req.body.members.senderId, req.body.members.receiverId]
        }

    })
    if (myconversation && myconversation._id) {
        return res.status(200).json(myconversation)
    }
    else {
        const newConversation = new Conversation({
            members: [req.body.members.senderId, req.body.members.receiverId]
        })
        // try {
        const savedConversation = await newConversation.save();
        console.log(savedConversation);
        return res.status(200).json(savedConversation);
        // } catch (error) {
        //     res.status(500).json(error);
        // }
        // }
        // } catch (error) {
        //     res.status(500).json(error);
        // }

        // console.log(req.body);
    }
})

//get all convers. of logged users ......
app.get("/conversation/:userId/:receiverId", auth, async (req, res) => {
    try {
        const myconversation = await Conversation.findOne({
            members: {
                // $in: [req.params.userId, ]
                // $in: [req.params.userId, req.params.receiverId]
                $all: [req.params.userId, req.params.receiverId]
            }
        })
        // console.log(myconversation);
        res.status(200).json(myconversation);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get("/allconversation/:userId", auth, async (req, res) => {
    try {
        const myconversation = await Conversation.find({
            members: {
                $in: [req.params.userId,]
            }
        })
        // console.log(myconversation);
        res.status(200).json(myconversation);
    } catch (error) {
        res.status(500).json(error);
    }
})


//add new message...
app.post("/messages", auth, async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
})

//when click a conversation give all messages-------------
app.get("/messages", auth, async (req, res) => {
    try {
        const allmessages = await Message.find({
            conversationId: req.query.cid
        });
        console.log(allmessages);
        res.status(200).json(allmessages);
    } catch (error) {
        res.status(500).json(error);
    }
})
app.get("/getuser", auth, async (req, res) => {
    const userId = req.query.user;
    console.log(userId);
    // try {
    const finduser = await UserCred.findOne({ email: userId });
    // if (finduser != null) {
    res.status(200).json(finduser);
    // }

    // } catch (error) {
    //     res.status(500).json();
    // }
})
app.get("/getbyid", auth, async (req, res) => {
    const userId = req.query.user;
    console.log(userId);
    // try {
    const finduser = await UserCred.findOne({ _id: userId });
    // if (finduser != null) {
    res.status(200).json(finduser);
    // }

    // } catch (error) {
    //     res.status(500).json();
    // }
})

db.connectDb().then(() => {
    app.listen(3000, () => {

    })

});