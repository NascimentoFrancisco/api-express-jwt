const {Router} = require("express")
const userController = require('../controller/singup')
const loginController = require('../controller/singIn')
const validateToken = require("../middleware/validateToken")
const getUSer =  require("../controller/getUser")
const refreshTOken = require("../controller/refreshtoken")

const routes = Router()


routes.post('/user', userController.createUser)

routes.post('/auth', loginController)

routes.post("/refresh", refreshTOken)

routes.get('/get-user', validateToken, getUSer)

module.exports = routes