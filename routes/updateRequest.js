const { Router } = require('express');
const { updateRequest } = require('../controllers/updateRequest');
const { authentication } = require('../middlewares/authentication');

const router = Router();

router.post( '/', [
   authentication
], updateRequest);
                                          
module.exports = router;           