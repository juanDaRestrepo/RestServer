
const { Router } = require('express');
const { check } = require('express-validator');

const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete } = require('../controllers/users.controller');
const { isValidRole, emailExists } = require('../helpers/db-validators');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password should contain six or more charaters').isLength({ min:6 }),
        check('email', 'Email is not valid').isEmail(),
        check('email', 'Email is already registered').custom( emailExists ),
        check('role').custom( isValidRole ),
        validateInputs
], usersPost );

router.delete('/', usersDelete );


module.exports = router;