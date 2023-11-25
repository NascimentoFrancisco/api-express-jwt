const asyncHandler = require("express-async-handler")
const User = require("../models/user")

const gettUser = asyncHandler(async (req, res) => {

    email = req.user['user']
    const user = await User.findOne({email})
    res.status(200).json(user);
});

module.exports = gettUser
