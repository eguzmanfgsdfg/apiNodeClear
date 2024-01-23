const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/login');
const { preLogin } = require('../middlewares/preLogin');

const router = Router();

router.post( '/', [
  preLogin
], login);

module.exports = router;