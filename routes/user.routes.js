
const { Router } = require('express');
const { check } = require('express-validator');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet );

router.put('/:id', usersPut );

router.post('/',[
        check('email', 'Email is not valid').isEmail()
], usersPost );

router.delete('/', usersDelete );


module.exports = router;