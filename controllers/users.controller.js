const {response} = require('express');
const bcryptjs = require('bcryptjs');


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

    
    const { name, email, password, role} =  req.body
    const user = new User( {name, email, password, role} );

 

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