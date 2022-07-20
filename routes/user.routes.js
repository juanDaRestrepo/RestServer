
const { Router } = require('express');
const { check } = require('express-validator');
const Role = require('../models/role.model');

const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete } = require('../controllers/users.controller');
const { validateInputs } = require('../middlewares/validate-inputs');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
        check('name', 'Name is required').not().isEmpty(),
        check('password', 'Password should contain six or more charaters').isLength({ min:6 }),
        check('email', 'Email is not valid').isEmail(),
        check('role').custom( async(role = '') => {
                const roleExists = await Role.findOne({role});
                if( !roleExists){
                        throw new Error(`Role ${ role } is not registered in DB`)
                }
        }),
        validateInputs
], usersPost );

router.delete('/', usersDelete );


module.exports = router;