const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required : true
    }
},
{
    timestamps: true
});

userSchema.pre('save', async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(this.password,salt);
        
        const user = this;
        if(user.isModified('password')){
            user.password = hashPassword;
        }
    }
    catch(err){
        next(err);
    }
});

module.exports = mongoose.model('User', userSchema);
