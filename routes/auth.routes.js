const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateInputs } = require('../middlewares/validate-inputs');


const router = Router();

router.post('/login',[
    check('email','The email is required').isEmail(),
    check('password','Passwor is required').not().isEmpty(),
    validateInputs
], login );


module.exports = router;