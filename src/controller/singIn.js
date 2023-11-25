
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require("../models/user")


const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        res.status(400).json({mensagem: "Todos os campos são obrigatórios"})
    }
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))){
        accessToken = jwt.sign({
            user: {
                user: user.email,
                id: user.id
            }
        }, process.env.JWT_SECRET,
            {expiresIn: "30m"}
        )
        res.status(200).json({
            accessToken
        })
        user.updateLastLogin()
    }else{
        res.status(401).json({mensagem: "Email ou senha inválidos"})
    }
})

module.exports = loginUser