
const asyncHandler = require("express-async-handler");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const User = require("../models/user")


const loginUser = asyncHandler(async (req, res) =>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({mensagem: "Todos os campos são obrigatórios"})
    }
    const user = await User.findOne({email})
    if (user && (await bcrypt.compare(password, user.password))){
        accessToken = jwt.sign(
            {
                user: {
                    user: user.email,
                    id: user.id
                }
            }, process.env.JWT_SECRET,
            {expiresIn: process.env.TIME_ACCESSTOKEN}
        )
        refreshToken = jwt.sign(
            {
                user: {
                    user: user.email,
                    id: user.id
                }
            }, process.env.JWT_SECRET_REFRESH,
            {expiresIn: process.env.TIME_REFRESHTOKEN}
        )
        user.updateLastLogin()
        return res.status(200).json({
            accessToken,
            refreshToken
        })
    }else{
        return res.status(401).json({mensagem: "Email ou senha inválidos"})
    }
})

module.exports = loginUser