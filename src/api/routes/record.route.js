const router = require('express').Router();
const auth = require('../middlewares/auth');
const recordService = require('../../services/record.service');

router.get('/', auth, async (req, res) => {
  // handle req input api

  // handle bussiness login
  const resVerify = await recordService.getHeartRates(req.user.id);

  // handle return for client
  return res.status(resVerify.code).json(resVerify.data);
});

router.get('/:id', auth, async (req, res) => {
  // handle req input api

  // handle bussiness login
  const resVerify = await recordService.getHeartRateDetail(req.params.id);

  // handle return for client
  return res.status(resVerify.code).json(resVerify.data);
});

router.post('/', auth, async (req, res) => {
  // handle req input api

  // handle bussiness login
  const resVerify = await recordService.createHeartRate(req.user.id, req.body);

  // handle return for client
  return res.status(resVerify.code).json(resVerify.data);
});

module.exports = router;
