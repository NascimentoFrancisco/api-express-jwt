const usermodel = require("../models/user")

const UserController = {

    async createUser (req, res){
        let user
        const body = req.body
        try{
            user = await usermodel.create(body)
            user = user.toObject()
            delete user.password
            res.status(201).json(user)
        }catch(e){
            //Verficação se o email não pertence a um usuáio já cadastrado
            if (e.code === 11000){
                res.status(500).json({"mensagem": "E-mail já existente"})
            } else{
                res.status(500).json({"mensagem": e.mensagem})
            }
            
        }
    }
}

module.exports = UserController