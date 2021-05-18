const router = require('express').Router();
const authService = require("../../services/auth.serive");

router.get("/verify_token", async (req,res) => {
    //handle req input api

    //handle bussiness login
    const resVerify = await authService.verify();

    //handle return for client
    return res.status(resVerify.code).json(resVerify.data);
});


// router.post("/login", authServ.login);
// router.post("/register", authServ.register);
module.exports = router;