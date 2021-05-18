const router = require('express').Router();
const auth = require("../middlewares/auth");
const authService = require("../../services/auth.serive");

router.get("/verify_token", auth, async (req, res) => {
  //handle req input api

  //handle bussiness login
  const resVerify = await authService.verify(req.user.id);

  //handle return for client
  return res.status(resVerify.code).json(resVerify.data);
});

router.post("/login", async (req, res) => {
  //handle req input api

  //handle bussiness login
  const resVerify = await authService.login(req.body);

  //handle return for client
  // console.log(resVerify);
  return res.status(resVerify.code).json(resVerify.data);
});

router.post("/register", async (req, res) => {
  //handle req input api

  //handle bussiness login
  const resVerify = await authService.register(req.body);

  //handle return for client
  return res.status(resVerify.code).json(resVerify.data);
});

module.exports = router;