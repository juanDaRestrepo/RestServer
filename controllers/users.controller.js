const {response} = require('express');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const User = require('../models/user.model');


const usersGet = (req = request, res = response) => {
    //accesing to the value of the query in the req we can access
    //to the info sent in the url
    const query = req.query;

    res.json({
        msg: 'get API - controller',
        query
    });
}

const usersPut = (req, res = response) => {

    const id = req.params.id;

    res.json({
        msg: 'put API - controller',
        id
    });
}

const usersPost = async(req, res = response) => {

    const errors = validationResult(req);
    if( !errors.isEmpty() ){
        return res.status(400).json(errors);
    }

    const { name, email, password, role} =  req.body
    const user = new User( {name, email, password, role} );

    const emailExists = await User.findOne({email});
    if(emailExists){
        return res.status(400).json({
            msg: 'Email is already registered'
        })
    }

    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt);

    await user.save();

    res.json({
        user
    });
}

const usersDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}