const { response } = require('express');
const bcryptjs = require('bcryptjs');

const userModel = require('../models/user.model');
const { generateJWT } = require('../helpers/generateJWT.JS');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try{
        //Comprobar si el usuario existe
        const user = await userModel.findOne({email});
        console.log(user)
        if(!user){
            return res.status(400).json({
                msg: "User or password are incorrect"
            })
        }

        //Verificar la contraseña
        const validPasssword = bcryptjs.compareSync( password, user.password);
        if( !validPasssword ){
            return res.status(400).json({
                msg: "User or password are incorrect"
            })
        }

        //Generar el JWT
        const token = await generateJWT(user.id)

        res.json({
            user,
            jwt: token
        })
    }catch (err){
        console.log(err);
        res.status(500).json({
            msg: 'Talk to admin'
        })
    }

   
}

module.exports = {
    login
}