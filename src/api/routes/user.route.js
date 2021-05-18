const router = require('express').Router();
//const auth = require("./middlewares/auth");
const userService = require("../../services/user");

router.get("/", async (req,res) => {
    //handle req input api

    //handle bussiness login
    const resGetUsers = await userService.getUsers();

    //handle return for client
    return res.status(resGetUsers.code).json(resGetUsers.data);
});


//router.get("/user/:id", auth, userServ.getUserDetail);

module.exports = router;