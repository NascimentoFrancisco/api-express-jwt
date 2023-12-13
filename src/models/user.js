const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    phone: [{
        number: String,
        ddd: String 
    }],
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    last_login: {
        type: Date
    }
})

userSchema.pre('save', async function (next){
    const user = this;
    if(user.isModified('password') || user.isNew){
        const encryptedPassword = await bcrypt.hash(user.password, 10)
        user.password = encryptedPassword
    }
    user.alterado_em = new Date();
    next()
})

userSchema.methods.updateLastLogin = function () {
    this.last_login = new Date();
    return this.save();
};

const User = mongoose.model('User', userSchema)

module.exports = User
