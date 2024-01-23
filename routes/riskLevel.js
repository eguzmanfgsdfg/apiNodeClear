const { Router } = require('express');
const { riskLevel } = require('../controllers/riskLevel');
const { authentication } = require('../middlewares/authentication');

const router = Router();

router.post( '/', [
   authentication
], riskLevel);
                                          
module.exports = router;           