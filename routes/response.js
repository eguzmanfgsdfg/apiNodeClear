const { Router } = require('express');
const { response } = require('../controllers/response');
const { authentication } = require('../middlewares/authentication');

const router = Router();

router.post( '/', [
   authentication
], response);
                                          
module.exports = router;           