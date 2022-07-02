const {response} = require('express')


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

const usersPost = (req, res = response) => {

    const {name, age} =  req.body
  
    res.json({
        msg: 'post API - controller',
        name,
        age
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